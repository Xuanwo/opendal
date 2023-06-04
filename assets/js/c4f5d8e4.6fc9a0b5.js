"use strict";(self.webpackChunkopendal_website=self.webpackChunkopendal_website||[]).push([[195],{5162:(e,t,a)=>{a.d(t,{Z:()=>o});var r=a(7294),n=a(6010);const l={tabItem:"tabItem_Ymn6"};function o(e){let{children:t,hidden:a,className:o}=e;return r.createElement("div",{role:"tabpanel",className:(0,n.Z)(l.tabItem,o),hidden:a},t)}},4866:(e,t,a)=>{a.d(t,{Z:()=>y});var r=a(7462),n=a(7294),l=a(6010),o=a(2466),s=a(6550),i=a(1980),u=a(7392),c=a(12);function m(e){return function(e){return n.Children.map(e,(e=>{if(!e||(0,n.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}(e).map((e=>{let{props:{value:t,label:a,attributes:r,default:n}}=e;return{value:t,label:a,attributes:r,default:n}}))}function p(e){const{values:t,children:a}=e;return(0,n.useMemo)((()=>{const e=t??m(a);return function(e){const t=(0,u.l)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,a])}function d(e){let{value:t,tabValues:a}=e;return a.some((e=>e.value===t))}function h(e){let{queryString:t=!1,groupId:a}=e;const r=(0,s.k6)(),l=function(e){let{queryString:t=!1,groupId:a}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!a)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return a??null}({queryString:t,groupId:a});return[(0,i._X)(l),(0,n.useCallback)((e=>{if(!l)return;const t=new URLSearchParams(r.location.search);t.set(l,e),r.replace({...r.location,search:t.toString()})}),[l,r])]}function k(e){const{defaultValue:t,queryString:a=!1,groupId:r}=e,l=p(e),[o,s]=(0,n.useState)((()=>function(e){let{defaultValue:t,tabValues:a}=e;if(0===a.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!d({value:t,tabValues:a}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${a.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const r=a.find((e=>e.default))??a[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:t,tabValues:l}))),[i,u]=h({queryString:a,groupId:r}),[m,k]=function(e){let{groupId:t}=e;const a=function(e){return e?`docusaurus.tab.${e}`:null}(t),[r,l]=(0,c.Nk)(a);return[r,(0,n.useCallback)((e=>{a&&l.set(e)}),[a,l])]}({groupId:r}),f=(()=>{const e=i??m;return d({value:e,tabValues:l})?e:null})();(0,n.useLayoutEffect)((()=>{f&&s(f)}),[f]);return{selectedValue:o,selectValue:(0,n.useCallback)((e=>{if(!d({value:e,tabValues:l}))throw new Error(`Can't select invalid tab value=${e}`);s(e),u(e),k(e)}),[u,k,l]),tabValues:l}}var f=a(2389);const b={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};function g(e){let{className:t,block:a,selectedValue:s,selectValue:i,tabValues:u}=e;const c=[],{blockElementScrollPositionUntilNextRender:m}=(0,o.o5)(),p=e=>{const t=e.currentTarget,a=c.indexOf(t),r=u[a].value;r!==s&&(m(t),i(r))},d=e=>{let t=null;switch(e.key){case"Enter":p(e);break;case"ArrowRight":{const a=c.indexOf(e.currentTarget)+1;t=c[a]??c[0];break}case"ArrowLeft":{const a=c.indexOf(e.currentTarget)-1;t=c[a]??c[c.length-1];break}}t?.focus()};return n.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,l.Z)("tabs",{"tabs--block":a},t)},u.map((e=>{let{value:t,label:a,attributes:o}=e;return n.createElement("li",(0,r.Z)({role:"tab",tabIndex:s===t?0:-1,"aria-selected":s===t,key:t,ref:e=>c.push(e),onKeyDown:d,onClick:p},o,{className:(0,l.Z)("tabs__item",b.tabItem,o?.className,{"tabs__item--active":s===t})}),a??t)})))}function N(e){let{lazy:t,children:a,selectedValue:r}=e;const l=(Array.isArray(a)?a:[a]).filter(Boolean);if(t){const e=l.find((e=>e.props.value===r));return e?(0,n.cloneElement)(e,{className:"margin-top--md"}):null}return n.createElement("div",{className:"margin-top--md"},l.map(((e,t)=>(0,n.cloneElement)(e,{key:t,hidden:e.props.value!==r}))))}function v(e){const t=k(e);return n.createElement("div",{className:(0,l.Z)("tabs-container",b.tabList)},n.createElement(g,(0,r.Z)({},e,t)),n.createElement(N,(0,r.Z)({},e,t)))}function y(e){const t=(0,f.Z)();return n.createElement(v,(0,r.Z)({key:String(t)},e))}},897:(e,t,a)=>{a.r(t),a.d(t,{default:()=>C});var r=a(7294),n=a(6010),l=a(2263),o=a(7961),s=a(7462);const i={features:"features_t9lD",featureSvg:"featureSvg_GfXr"};var u=a(3905),c=a(4866),m=a(5162);const p={toc:[]},d="wrapper";function h(e){let{components:t,...a}=e;return(0,u.kt)(d,(0,s.Z)({},p,a,{components:t,mdxType:"MDXLayout"}),(0,u.kt)("p",null,"Apache OpenDAL provides ",(0,u.kt)("a",{parentName:"p",href:"pathname:///docs/rust/opendal/"},"Rust Core")," and builds different language bindings like ",(0,u.kt)("a",{parentName:"p",href:"pathname:///docs/nodejs/"},"Node.js Binding")," and ",(0,u.kt)("a",{parentName:"p",href:"pathname:///docs/python/"},"Python Binding"),"."),(0,u.kt)("blockquote",null,(0,u.kt)("p",{parentName:"blockquote"},(0,u.kt)("em",{parentName:"p"},"More bindings like ",(0,u.kt)("a",{parentName:"em",href:"https://github.com/apache/incubator-opendal/blob/main/bindings/c/README.md"},"C"),", ",(0,u.kt)("a",{parentName:"em",href:"https://github.com/apache/incubator-opendal/blob/main/bindings/java/README.md"},"Java"),", ",(0,u.kt)("a",{parentName:"em",href:"https://github.com/apache/incubator-opendal/blob/main/bindings/ruby/README.md"},"Ruby")," are still being worked on."))),(0,u.kt)(c.Z,{mdxType:"Tabs"},(0,u.kt)(m.Z,{value:"rust",label:"Rust",default:!0,mdxType:"TabItem"},(0,u.kt)("pre",null,(0,u.kt)("code",{parentName:"pre",className:"language-rust"},'use opendal::Operator;\n\nlet op = Operator::via_map(Scheme::Fs, HashMap::new()?;\nop.read("path/to/file").await?;\n'))),(0,u.kt)(m.Z,{value:"node.js",label:"Node.js",mdxType:"TabItem"},(0,u.kt)("pre",null,(0,u.kt)("code",{parentName:"pre",className:"language-javascript"},'import { Operator } from "opendal";\n\nconst op = new Operator("fs", {});\nawait op.read("path/to/file")\n'))),(0,u.kt)(m.Z,{value:"python",label:"Python",mdxType:"TabItem"},(0,u.kt)("pre",null,(0,u.kt)("code",{parentName:"pre",className:"language-python"},'import opendal\n\nop = opendal.Operator("fs")\nop.read("path/to/file")\n')))))}h.isMDXComponent=!0;const k={toc:[]},f="wrapper";function b(e){let{components:t,...a}=e;return(0,u.kt)(f,(0,s.Z)({},k,a,{components:t,mdxType:"MDXLayout"}),(0,u.kt)("p",null,"Apache OpenDAL provides native support for all kinds for storage systems."),(0,u.kt)("details",null,(0,u.kt)("summary",null,"Standard Storage Protocols"),(0,u.kt)("ul",null,(0,u.kt)("li",{parentName:"ul"},"fs: POSIX alike file system"),(0,u.kt)("li",{parentName:"ul"},"ftp: FTP and FTPS"),(0,u.kt)("li",{parentName:"ul"},"http: HTTP read-only services"),(0,u.kt)("li",{parentName:"ul"},"sftp: ",(0,u.kt)("a",{parentName:"li",href:"https://datatracker.ietf.org/doc/html/draft-ietf-secsh-filexfer-02"},"SFTP")," services ",(0,u.kt)("em",{parentName:"li"},"being worked on")),(0,u.kt)("li",{parentName:"ul"},"webdav: ",(0,u.kt)("a",{parentName:"li",href:"https://datatracker.ietf.org/doc/html/rfc4918"},"WebDAV")," Service"))),(0,u.kt)("details",null,(0,u.kt)("summary",null,"Object Storage Services"),(0,u.kt)("ul",null,(0,u.kt)("li",{parentName:"ul"},"azblob: ",(0,u.kt)("a",{parentName:"li",href:"https://azure.microsoft.com/en-us/services/storage/blobs/"},"Azure Storage Blob")," services"),(0,u.kt)("li",{parentName:"ul"},"gcs: ",(0,u.kt)("a",{parentName:"li",href:"https://cloud.google.com/storage"},"Google Cloud Storage")," Service"),(0,u.kt)("li",{parentName:"ul"},"obs: ",(0,u.kt)("a",{parentName:"li",href:"https://www.huaweicloud.com/intl/en-us/product/obs.html"},"Huawei Cloud Object Storage")," Service (OBS)"),(0,u.kt)("li",{parentName:"ul"},"oss: ",(0,u.kt)("a",{parentName:"li",href:"https://www.aliyun.com/product/oss"},"Aliyun Object Storage Service")," (OSS)"),(0,u.kt)("li",{parentName:"ul"},"s3: ",(0,u.kt)("a",{parentName:"li",href:"https://aws.amazon.com/s3/"},"AWS S3")," alike services"),(0,u.kt)("li",{parentName:"ul"},"supabase: ",(0,u.kt)("a",{parentName:"li",href:"https://supabase.com/docs/guides/storage"},"Supabase Storage")," Service ",(0,u.kt)("em",{parentName:"li"},"being worked on")),(0,u.kt)("li",{parentName:"ul"},"wasabi: ",(0,u.kt)("a",{parentName:"li",href:"https://wasabi.com/"},"Wasabi")," Cloud Storage"))),(0,u.kt)("details",null,(0,u.kt)("summary",null,"File Storage Services"),(0,u.kt)("ul",null,(0,u.kt)("li",{parentName:"ul"},"azdfs: ",(0,u.kt)("a",{parentName:"li",href:"https://azure.microsoft.com/en-us/products/storage/data-lake-storage/"},"Azure Data Lake Storage Gen2")," services (As known as ",(0,u.kt)("a",{parentName:"li",href:"https://learn.microsoft.com/en-us/azure/storage/blobs/data-lake-storage-abfs-driver"},"abfs"),")"),(0,u.kt)("li",{parentName:"ul"},"hdfs: ",(0,u.kt)("a",{parentName:"li",href:"https://hadoop.apache.org/docs/r3.3.4/hadoop-project-dist/hadoop-hdfs/HdfsDesign.html"},"Hadoop Distributed File System"),"(HDFS)"),(0,u.kt)("li",{parentName:"ul"},"ipfs: ",(0,u.kt)("a",{parentName:"li",href:"https://ipfs.tech/"},"InterPlanetary File System")," HTTP Gateway"),(0,u.kt)("li",{parentName:"ul"},"ipmfs: ",(0,u.kt)("a",{parentName:"li",href:"https://ipfs.tech/"},"InterPlanetary File System")," MFS API ",(0,u.kt)("em",{parentName:"li"},"being worked on")),(0,u.kt)("li",{parentName:"ul"},"webhdfs: ",(0,u.kt)("a",{parentName:"li",href:"https://hadoop.apache.org/docs/stable/hadoop-project-dist/hadoop-hdfs/WebHDFS.html"},"WebHDFS")," Service"))),(0,u.kt)("details",null,(0,u.kt)("summary",null,"Consumer Cloud Storage Service"),(0,u.kt)("ul",null,(0,u.kt)("li",{parentName:"ul"},"gdrive: ",(0,u.kt)("a",{parentName:"li",href:"https://www.google.com/drive/"},"Google Drive")," ",(0,u.kt)("em",{parentName:"li"},"being worked on")),(0,u.kt)("li",{parentName:"ul"},"onedrive: ",(0,u.kt)("a",{parentName:"li",href:"https://www.microsoft.com/en-us/microsoft-365/onedrive/online-cloud-storage"},"OneDrive")," ",(0,u.kt)("em",{parentName:"li"},"being worked on")))),(0,u.kt)("details",null,(0,u.kt)("summary",null,"Key-Value Storage Service"),(0,u.kt)("ul",null,(0,u.kt)("li",{parentName:"ul"},"dashmap: ",(0,u.kt)("a",{parentName:"li",href:"https://github.com/xacrimon/dashmap"},"dashmap")," backend"),(0,u.kt)("li",{parentName:"ul"},"memory: In memory backend"),(0,u.kt)("li",{parentName:"ul"},"redis: ",(0,u.kt)("a",{parentName:"li",href:"https://redis.io/"},"Redis")," services"),(0,u.kt)("li",{parentName:"ul"},"rocksdb: ",(0,u.kt)("a",{parentName:"li",href:"http://rocksdb.org/"},"RocksDB")," services"),(0,u.kt)("li",{parentName:"ul"},"sled: ",(0,u.kt)("a",{parentName:"li",href:"https://crates.io/crates/sled"},"sled")," backend"))),(0,u.kt)("details",null,(0,u.kt)("summary",null,"Cache Storage Service"),(0,u.kt)("ul",null,(0,u.kt)("li",{parentName:"ul"},"ghac: ",(0,u.kt)("a",{parentName:"li",href:"https://docs.github.com/en/actions/using-workflows/caching-dependencies-to-speed-up-workflows"},"Github Action Cache")," Service"),(0,u.kt)("li",{parentName:"ul"},"memcached: ",(0,u.kt)("a",{parentName:"li",href:"https://memcached.org/"},"Memcached")," service"),(0,u.kt)("li",{parentName:"ul"},"moka: ",(0,u.kt)("a",{parentName:"li",href:"https://github.com/moka-rs/moka"},"moka")," backend"),(0,u.kt)("li",{parentName:"ul"},"vercel_artifacts: ",(0,u.kt)("a",{parentName:"li",href:"https://vercel.com/docs/concepts/monorepos/remote-caching"},"Vercel Remote Caching")," Service ",(0,u.kt)("em",{parentName:"li"},"being worked on")))))}b.isMDXComponent=!0;const g={toc:[]},N="wrapper";function v(e){let{components:t,...a}=e;return(0,u.kt)(N,(0,s.Z)({},g,a,{components:t,mdxType:"MDXLayout"}),(0,u.kt)("p",null,"Apache OpenDAL offers native layer support, enabling users to implement middleware or intercept for all operations."),(0,u.kt)("p",null,"By using layers, we can:"),(0,u.kt)("ul",null,(0,u.kt)("li",{parentName:"ul"},(0,u.kt)("inlineCode",{parentName:"li"},"RetryLayer"),": Automatically retry failed requests and resume from the point of failure."),(0,u.kt)("li",{parentName:"ul"},(0,u.kt)("inlineCode",{parentName:"li"},"ChaosLayer"),": Generate simulated chaos for storage services."),(0,u.kt)("li",{parentName:"ul"},(0,u.kt)("inlineCode",{parentName:"li"},"ConcurrentLimitLayer"),": Set concurrent limit while accessing storage services."),(0,u.kt)("li",{parentName:"ul"},(0,u.kt)("inlineCode",{parentName:"li"},"{Logging|Metrics|Tracing}Layer"),": Provide native observability for storage services.")))}v.isMDXComponent=!0;var y=a(1506);const w=[{title:"Languages",description:r.createElement(r.Fragment,null,r.createElement(y.Z,null,r.createElement(h,null)))},{title:"Services",description:r.createElement(r.Fragment,null,r.createElement(y.Z,null,r.createElement(b,null)))},{title:"Layers",description:r.createElement(r.Fragment,null,r.createElement(y.Z,null,r.createElement(v,null)))}];function S(e){let{Svg:t,title:a,description:l}=e;return r.createElement("div",{className:(0,n.Z)("col col--4")},r.createElement("div",{className:"padding-horiz--md"},r.createElement("h3",null,a),r.createElement("div",null,l)))}function E(){return r.createElement("section",{className:i.features},r.createElement("div",{className:"container"},r.createElement("div",{className:"row"},w.map(((e,t)=>r.createElement(S,(0,s.Z)({key:t},e)))))))}const D={heroBanner:"heroBanner_qdFl",buttons:"buttons_AeoN"};function T(){const{siteConfig:e}=(0,l.Z)();return r.createElement("header",{className:(0,n.Z)("hero",D.heroBanner)},r.createElement("div",{className:"container"},r.createElement("h1",{className:"hero__title"},e.title),r.createElement("p",{className:"hero__subtitle"},"Open ",r.createElement("b",null,"D"),"ata ",r.createElement("b",null,"A"),"ccess ",r.createElement("b",null,"L"),"ayer: Access data freely")))}function C(){const{siteConfig:e}=(0,l.Z)();return r.createElement(o.Z,{description:"OpenDAL is the Open Data Access Layer to access data freely."},r.createElement(T,null),r.createElement("main",null,r.createElement(E,null)))}}}]);