(() => {
'use strict';
const DOC_ID='1-bpUffM-E0xer3zJYCAzfvA_fMUtJp3ps65N8FqDdsM';
const tags=new Set('P SPAN DIV H1 H2 H3 H4 H5 H6 TABLE THEAD TBODY TFOOT TR TH TD UL OL LI A B STRONG I EM U S SUP SUB BR HR IMG BLOCKQUOTE'.split(' '));
function exportTab(tab,source){
 const doc=new DOMParser().parseFromString(source,'text/html');
 if(!doc.body.classList.contains('doc-content'))throw Error('無法讀取分頁：'+tab.title);
 const prefix='doc-'+tab.id.replaceAll('.','-'),out=document.createElement('div');
 const copy=(node,parent)=>{
  if(node.nodeType===Node.TEXT_NODE){parent.append(document.createTextNode(node.textContent));return;}
  if(node.nodeType!==Node.ELEMENT_NODE||!tags.has(node.tagName))return;
  const item=document.createElement(node.tagName.toLowerCase());
  for(const attr of node.attributes){
   const name=attr.name;let value=attr.value;
   if(name==='id')value=prefix+'-'+value;
   else if(name==='href'){
    if(value.startsWith('#'))value='#'+prefix+'-'+value.slice(1);
    else if(!/^(https?:\/\/|mailto:)/i.test(value))continue;
   }else if(name==='src'){
    if(!/^data:image\/(png|jpeg|gif|webp);base64,/i.test(value)){
     let u;try{u=new URL(value);}catch{continue;}
     if(u.protocol!=='https:'||!(u.hostname==='docs.google.com'||u.hostname.endsWith('.googleusercontent.com')))continue;
    }
   }else if(name==='style'){
    if(/url\s*\(|expression|@|javascript|position\s*:/i.test(value))continue;
   }else if(!['class','alt','title','colspan','rowspan','start','width','height'].includes(name))continue;
   item.setAttribute(name,value);
  }
  parent.append(item);node.childNodes.forEach(child=>copy(child,item));
 };
 doc.body.childNodes.forEach(node=>copy(node,out));
 let css=[...doc.querySelectorAll('style')].map(s=>s.textContent).join('').replace(/@import\s+[^;]+;/gi,'');
 if(/@|url\s*\(|expression|<\/style/i.test(css))throw Error('無法安全處理分頁樣式：'+tab.title);
 css=css.replace(/([^{}]+)\{/g,(_,selectors)=>selectors.split(',').map(s=>'#'+prefix+' '+s.trim()).join(',')+'{');
 return {...tab,html:out.innerHTML,css,contentId:prefix};
}
function endpoint(){
 const value=String(window.CRIMEVOICE_SYNC_URL||'').trim().replace(/\/$/,'');
 if(!value)throw Error('線上更新尚未設定 Worker 網址');
 let url;try{url=new URL(value);}catch{throw Error('更新服務網址格式錯誤');}
 if(url.protocol!=='https:'||url.username||url.password||url.pathname!=='/'||url.search||url.hash)throw Error('請設定完整的 HTTPS Worker 網址（不含路徑）');
 return url.origin;
}
function store(mode,value){return new Promise(resolve=>{
 if(!window.indexedDB){resolve(null);return;}
 let open;try{open=indexedDB.open('crimevoice-reader',1);}catch{resolve(null);return;}
 open.onupgradeneeded=()=>open.result.createObjectStore('snapshots');
 open.onerror=open.onblocked=()=>resolve(null);
 open.onsuccess=()=>{
  const db=open.result;let result=null;
  try{const tx=db.transaction('snapshots',mode==='get'?'readonly':'readwrite');const request=mode==='get'?tx.objectStore('snapshots').get(DOC_ID):tx.objectStore('snapshots').put(value,DOC_ID);
   request.onsuccess=()=>{result=request.result;};tx.oncomplete=()=>{db.close();resolve(result);};tx.onerror=tx.onabort=()=>{db.close();resolve(null);};
  }catch{db.close();resolve(null);}
 };
});}
async function api(path,method='GET'){
 const response=await fetch(endpoint()+path,{method,mode:'cors',credentials:'omit',cache:'no-store',signal:AbortSignal.timeout(60000)});
 let value;try{value=await response.json();}catch{throw Error('更新服務回傳格式異常');}
 if(!response.ok)throw Error(value.error||'共用更新暫時無法使用（'+response.status+'）');
 return value;
}
async function latest(){return api('/latest');}
async function loadShared(current,progress,known){
 const manifest=known||await latest();
 if(!manifest)return current;
 if(String(manifest.revision)===String(current.revision))return {...current,sharedVersion:manifest.version};
 if(/^\d+$/.test(String(current.revision))&&/^\d+$/.test(String(manifest.revision))&&BigInt(current.revision)>BigInt(manifest.revision))return current;
 progress('正在讀取共用版本…');
 const source=await api('/snapshot?version='+encodeURIComponent(manifest.version));
 const tabs=source.tabs.map(tab=>exportTab(tab,tab.source));
 const next={documentId:DOC_ID,revision:source.revision,updatedAt:source.updatedAt,checkedAt:source.updatedAt,sharedVersion:manifest.version,tabs};
 await store('put',next);return next;
}
async function synchronize(current,progress){
 progress('正在確認 Google 文件版本…');
 const job=await api('/update/start','POST');
 if(job.unchanged)return loadShared(current,progress,job.manifest);
 let cursor=0,done=0,failure=null;
 const download=async()=>{
  while(!failure&&cursor<job.tabs.length){const tab=job.tabs[cursor++];
   try{await api('/update/tab?session='+job.session+'&tab='+encodeURIComponent(tab.id),'POST');done++;progress('正在建立共用版本：'+done+' / '+job.tabs.length);}catch(error){failure=error;}
  }
 };
 await Promise.all(Array.from({length:Math.min(3,job.tabs.length)},download));if(failure)throw failure;
 progress('正在核對並發布共用版本…');
 const manifest=await api('/update/commit?session='+job.session,'POST');
 return loadShared(current,progress,manifest);
}
window.CrimevoiceCloudSync={synchronize,loadShared,latest,loadSaved:()=>store('get')};
})();
