- Proposal Name: `concurrent_list`
- Start Date: 2024-07-30 
- RFC PR: [apache/opendal#0000](https://github.com/apache/opendal/pull/0000)
- Tracking Issue: [apache/opendal#0000](https://github.com/apache/opendal/issues/0000)

# Summary

This proposal introduces a new API for listing entries within OpenDAL concurrently. This will allow users to significantly speed up listing operations, especially for services like S3 where listing large prefixes can be slow. The proposed API introduces `partitions` and `concurrent` options to the `lister_with` method (specifically, to the `FutureLister` type it returns), enabling users to define specific prefixes and concurrency levels for concurrent listing.

# Motivation

Listing large numbers of files (e.g., millions) in a flat directory or a deep nested directory can be extremely slow. This is a common problem for users who store large datasets in object storage services. For example, listing a large prefix on S3 is a very slow process. OpenDAL aims to provide "Fast Access" with zero overhead. Introducing concurrent listing capabilities will greatly improve performance for such use cases and align with this promise. This feature has been requested by the community (e.g., issue #987) and is crucial for users dealing with large-scale data.

# Guide-level explanation

To perform a concurrent list operation, you will use the `lister_with` method on an `Operator`. This method returns a `FutureLister` object, on which you can set new options like `partitions` and `concurrent` before `await`ing the result.

Let's say you have a directory structure like this:

```
your-bucket/
  data/
    a/file1.txt
    a/file2.txt
    ...
    b/file3.txt
    b/file4.txt
    ...
    m/file5.txt
    m/file6.txt
    ...
    z/file7.txt
```

If you want to list all files under `data/` concurrently, you can specify partitions to divide the listing workload. For example, you could partition by the first letter of the subdirectories:

```rust
let op = Operator::new(...)?;

let future_lister = op
    .lister_with("data/")
    .partitions(["a", "m"]) // Partitions are relative to "data/"
    .concurrent(3); // Specify concurrency for this partitioned list

let result = future_lister.await?;

// This will effectively trigger three distinct listing operations based on the ranges:
// 1. List items in `data/` up to (but not including) `data/a/`
// 2. List items in `data/a/` up to (but not including) `data/m/`
// 3. List items in `data/m/` and onwards
```

You can also control the degree of concurrency using the `.concurrent()` method:

```rust
let future_lister = op
    .lister_with("data/")
    .partitions(["a", "b", "c", "d", "e", "f"]) // 6 partitions define 7 listing ranges
    .concurrent(3); // Max number of concurrent listing operations for this specific partitioned list
    
let result = future_lister.await?;
```

**Important Considerations:**

*   **Partition Semantics:** The provided `partitions` are prefixes that define ranges. For `partitions(["a", "m"])` on path `data/`, OpenDAL will list:
    *   `data/` (items lexically before `data/a/`)
    *   `data/a/` (items lexically before `data/m/`)
    *   `data/m/` (items from `data/m/` onwards)
    OpenDAL will ensure that the results from these concurrent operations are unique and cover the entire range specified by the initial path and the partitions. The input partitions will be sorted and deduplicated internally to ensure correct, non-overlapping range definitions.
*   **Interaction with `concurrent()`:** The `concurrent(N)` method, when used with `partitions()`, specifically controls the concurrency for *this* partitioned listing operation. If the number of effective listing tasks (derived from the number of partitions plus one for the initial range) exceeds `N`, then `N` will cap the maximum number of truly parallel operations for this specific list call. For instance, with `partitions(["a", "b", "c"])` (which implies 4 listing tasks) and `concurrent(2)`, only two listing operations for these partitions will run at any given time. This is distinct from any global concurrency settings OpenDAL might have.
*   **Ordering:** When using partitions for concurrent listing, the returned order of entries is no longer guaranteed to be lexicographical across the entire result set. Results from different partitions will arrive as they are completed.
*   **Non-Recursive Listing:** This feature works for both recursive and non-recursive listings, as long as the underlying service supports listing with prefixes (like S3's `ListObjectsV2` with a `Delimiter` for non-recursive, or without for recursive).
*   **Choosing Partitions:** Users are responsible for choosing meaningful partitions based on their data layout. Good partitioning can significantly improve performance. Poor partitioning (e.g., partitions that don't effectively divide the workload) might not yield significant speedups. The API gives control to the user, who often has prior knowledge of their data's structure.

This approach allows users to leverage their knowledge of the data distribution to optimize listing operations.

# Reference-level explanation

The `Operator::lister_with(&self, path: &str)` method returns a `FutureLister`. This `FutureLister` type will be enhanced with new methods to configure partitioned listing. These methods will modify an internal `opendal::raw::options::ListOptions` struct.

```rust
// In opendal::raw::options
#[derive(Debug, Default, Clone)]
pub struct ListOptions {
    // ... existing options like 'recursive', 'limit', 'start_after' ...
    pub meta_access: Option<MetaAccess>, // Existing example option
    
    /// Partitions for concurrent listing.
    /// These are relative prefixes used to divide the listing operation.
    pub partition_values: Option<Vec<String>>,
    /// Concurrency limit for the partitioned listing operation.
    /// This controls how many partitions are listed in parallel.
    pub partition_concurrent_limit: Option<usize>,
}

// In opendal::Operator or a similar module defining FutureLister
// Conceptual structure for FutureLister
pub struct FutureLister<F> {
    // ... internal fields ...
    options: ListOptions,
    // ... other fields like operator handle, path, and the future itself ...
}

impl<F> FutureLister<F>
where
    F: Future<Output = Result<Lister>>, // Lister is the actual stream of entries
{
    // ... existing methods like recursive(), limit(), start_after() ...

    /// Set the partitions for concurrent listing.
    ///
    /// Partitions are relative prefixes to the main listing path.
    /// For example, if listing `data/` with partitions `["a", "m"]`,
    /// this will result in three effective listing ranges:
    /// 1. `data/` (up to `data/a/`)
    /// 2. `data/a/` (up to `data/m/`)
    /// 3. `data/m/` (onwards)
    pub fn partitions<I, S>(mut self, partitions: I) -> Self
    where
        I: IntoIterator<Item = S>,
        S: AsRef<str>,
    {
        let mut parts: Vec<String> = partitions.into_iter().map(|s| s.as_ref().to_string()).collect();
        // It's recommended to sort and dedup partitions here or within the Lister logic.
        parts.sort();
        parts.dedup();
        self.options.partition_values = Some(parts);
        self
    }

    /// Set the concurrency limit for the partitioned listing operation.
    ///
    /// This controls how many of the defined partitions are listed in parallel.
    /// This setting is specific to the partitioned listing triggered by `partitions()`.
    pub fn concurrent(mut self, limit: usize) -> Self {
        self.options.partition_concurrent_limit = Some(limit);
        self
    }
    
    // The .await() method (or similar execution mechanism) will eventually pass
    // self.options to the underlying Lister implementation.
}

// In opendal::Lister (or its internal equivalent that handles the listing logic)
// The Lister will receive ListOptions during its construction.
// No direct `partitions` or `concurrent_limit` fields are needed on the Lister struct itself
// if they are sourced from ListOptions.

// The core listing logic within the Lister will change:
// If `options.partition_values` is Some:
// 1. Validate partitions from `options.partition_values`: They should be relative to the lister's path and represent valid path segments.
// 2. The partitions are already sorted and deduplicated by the `FutureLister::partitions()` method. Let them be p_1, p_2, ..., p_n.
// 3. Construct ranges for listing:
//    - Range 0: list from `lister.path` up to (but not including) `lister.path + p_1`
//    - Range 1: list from `lister.path + p_1` up to (but not including) `lister.path + p_2`
//    - ...
//    - Range n: list from `lister.path + p_n` onwards
// 4. Create multiple underlying lister tasks based on these ranges. The total number of tasks will be `n + 1`.
// 5. Execute these tasks concurrently. If `options.partition_concurrent_limit` is set (e.g., to `M`), the execution will be constrained to run at most `M` tasks in parallel.
// 6. Merge the streams of entries. No specific order is guaranteed post-merge if partitions are used.
//
// If `options.partition_values` is None, the existing listing logic applies.
```

**Service-Level Implementation Details:**

For services like S3, GCS, Azure Blob Storage:
The `list` operation with partitions (configured via `FutureLister` and `ListOptions`) will translate into multiple native list calls. For example, if `op.lister_with("data/").partitions(["a", "m"])` was called:

1.  A list request for path `data/` with an end delimiter (exclusive) of `data/a`.
2.  A list request for path `data/a/` with an end delimiter (exclusive) of `data/m`.
3.  A list request for path `data/m/` with no end delimiter.

These requests will be made concurrently. The `Lister` will use a mechanism (e.g., `futures::stream::select_all` or a similar construct) to merge the results from these concurrent operations.

**Error Handling:**
If any of the concurrent list operations fail, the error should be propagated. The behavior regarding partial results (if some partitions succeed and others fail) needs to be defined. A common approach is to return an error as soon as one occurs, canceling other in-flight requests.

# Drawbacks

*   **Increased API Complexity:** Adds a new option to the listing API, which users need to understand to use effectively.
*   **User Responsibility for Partitions:** The effectiveness of this feature depends on the user providing sensible partitions. Poorly chosen partitions might not lead to performance gains or could even slightly increase overhead due to multiple requests.
*   **Loss of Lexicographical Order:** When partitions are used, the global lexicographical order of results is lost. This might be a concern for users who rely on this ordering, though for many high-volume listing use cases, completeness and speed are prioritized over order.
*   **Potential for Increased Request Costs:** Spawning multiple list operations could lead to higher request costs on some cloud providers if not used judiciously, although typically the cost of listing is low compared to data transfer or storage.

# Rationale and alternatives

*   **Why this design?**
    *   **User Control:** It gives users who understand their data layout the power to optimize listing. This aligns with OpenDAL's philosophy of providing efficient, low-level primitives.
    *   **Avoids Assumptions:** OpenDAL doesn't try to guess or automatically determine partitions. Automatic partitioning (e.g., based on an initial non-recursive list) can be complex, error-prone if assumptions about data structure are wrong, and could introduce significant overhead, negating the "zero overhead" promise.
    *   **Flexibility:** Works for various scenarios, including flat namespaces and deeply nested directories, as long as the user can define meaningful prefix partitions.

*   **Alternatives Considered:**
    1.  **Automatic Recursive Partitioning:**
        *   Idea: Perform a non-recursive list of the initial path, then for each subdirectory found, spawn a recursive list operation.
        *   Rationale for not choosing: As discussed in [Discussion #6115](https://github.com/apache/opendal/discussions/6115#discussioncomment-12967642), this relies heavily on assumptions about the user's file structures (e.g., that the first level of directories provides good distribution). If assumptions are wrong (e.g., only one level of paths like `a/1, a/2, ..., a/1000000`, or extremely numerous small directories like `a9/f8/a9f8...`), it could lead to poor performance or excessive initial listing overhead.
    2.  **Cursor-Based/Token-Based Automatic Parallelization:**
        *   Idea: Some services return continuation tokens. If a list operation is truncated, multiple requests could potentially be made in parallel using these tokens if the service allows it for different "segments" of the keyspace.
        *   Rationale for not choosing: This is highly service-specific and might not be universally applicable. The `partitions` approach provides a more generic abstraction. It could be a future optimization within a specific service implementation if feasible.

*   **Impact of not doing this:**
    Users with very large directories will continue to experience slow listing performance, potentially making OpenDAL unsuitable for certain large-scale data processing tasks or requiring them to implement manual concurrent listing logic outside of OpenDAL, which is error-prone and cumbersome.

# Prior art

*   **AWS S3 SDK (e.g., `list_objects_v2`):** While the basic S3 API lists sequentially, many tools and libraries built on top of it implement concurrent listing by prefix. For instance, tools like `s5cmd` or custom scripts often list common prefixes concurrently.
*   **Apache Hadoop/Spark:** When reading data from object stores, these systems often employ strategies to list and process data in parallel by splitting input paths or using glob patterns that resolve to multiple concurrent listing/reading tasks.
*   **Rclone:** A popular cloud storage sync tool. `rclone ls --fast-list` uses more memory to buffer more objects in memory and can use more concurrent checkers. While not exactly the same as user-defined partitions, it shows the need for optimized listing.
*   Many backup and data migration tools implement forms of parallel listing to speed up discovery of changes or full data scans.

The proposed approach learns from these by providing a user-driven mechanism to define the seams for concurrency, which is a common pattern in high-performance tools that interact with object storage.

# Unresolved questions

*   **Exact Behavior on Empty Partitions:** What if `partitions` is an empty slice? (Current thought: treat as no partitions, i.e., equivalent to a standard list operation for the given path).
*   **Partition String Validation:** What characters or patterns are considered invalid for a partition string? (e.g., empty strings, `.` or `..` segments, absolute paths, non-UTF-8 sequences). Should there be normalization (e.g., trimming trailing slashes)? (Current thought: Partitions should be valid relative path segments. Empty strings or `.` might be ignored or treated as errors. `..` should likely be an error).
*   **Error Propagation Details:** If multiple concurrent list operations are spawned, and one or more fail, how are errors aggregated or prioritized? (Current thought: fail fast on the first error, potentially cancelling other in-flight operations).
*   **Interaction with `limit()`:** How should `lister_with(...).partitions(...).concurrent(M).limit(N)` behave? Does `N` (from the general `limit()` option) apply to each partition, or the total? (Current thought: `N` should ideally apply to the total number of items returned from the combined concurrent operations. This is user-friendly but complex to implement efficiently without over-fetching. An alternative is for `limit(N)` to apply to each partition stream before merging, which is simpler but less intuitive for the user. This needs careful consideration and clear documentation of the chosen behavior). The `concurrent(M)` method is specific to the partitioned listing concurrency, distinct from the `limit(N)` for total items.

# Future possibilities

*   **Automatic Partitioning Strategies (Optional):** While this RFC proposes manual partitioning, future RFCs could explore opt-in automatic partitioning strategies for common data layouts if reliable heuristics can be developed. This would build upon the core concurrent listing capability introduced here.
*   **Integration with `glob`:** Concurrent listing could potentially speed up `glob` operations if the glob pattern can be decomposed into multiple prefix-based listings.
*   **Service-Specific Optimizations:** Services might offer specific APIs for parallel listing (e.g., S3 Inventory, or specific list modes) that could be leveraged internally by the `Lister` when no explicit partitions are given by the user, or to enhance the partitioning strategy.
