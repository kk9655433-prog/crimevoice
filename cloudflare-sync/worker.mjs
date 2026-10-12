import {metadata} from './metadata.mjs';
const DOC_ID='1-bpUffM-E0xer3zJYCAzfvA_fMUtJp3ps65N8FqDdsM';
const ORIGIN='https://monitor0314.github.io';
const uuid=value=>/^[a-f0-9-]{36}$/.test(value||'');
async function google(tab){
 const url=new URL('https://docs.google.com/document/d/'+DOC_ID+(tab?'/export':'/edit'));
 if(tab){url.searchParams.set('format','html');url.searchParams.set('tab',tab);}
 url.searchParams.set('_',Date.now());
 const response=await fetch(url,{headers:{Accept:'text/html','Cache-Control':'no-cache'},redirect:'follow',signal:AbortSignal.timeout(25000)});
 if(!response.ok||new URL(response.url).hostname==='accounts.google.com'||!(response.headers.get('Content-Type')||'').includes('text/html'))throw Error('無法讀取 Google 文件，請確認仍允許直接檢視');
 const text=await response.text();
 if(tab&&!/<body\b[^>]*class=["'][^"']*\bdoc-content\b/i.test(text))throw Error('Google 分頁格式異常，保留原共用版本');
 return text;
}
export default {async fetch(request,env){
 const url=new URL(request.url),origin=request.headers.get('Origin');
 const allowed=!origin||origin===ORIGIN||origin===url.origin;
 const headers=new Headers({'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Vary':'Origin','Access-Control-Allow-Methods':'GET, POST, OPTIONS','Access-Control-Allow-Headers':'Content-Type'});
 if(allowed&&origin)headers.set('Access-Control-Allow-Origin',origin);
 const json=(value,status=200)=>new Response(JSON.stringify(value),{status,headers});
 if(!allowed)return json({error:'Origin not allowed'},403);
 if(request.method==='OPTIONS')return new Response(null,{status:204,headers});
 if(url.pathname==='/'||url.pathname==='/health')return json({service:'crimevoice-shared-sync',storage:!!env.SCRIPTS,documentId:DOC_ID});
 if(!env.SCRIPTS)return json({error:'尚未連結共用儲存 SCRIPTS'},503);
 const kv=env.SCRIPTS;
 try{
  if(request.method==='GET'&&url.pathname==='/latest')return json(await kv.get('latest',{type:'json',cacheTtl:30}));
  if(request.method==='GET'&&url.pathname==='/snapshot'){
   const version=url.searchParams.get('version');if(!uuid(version))return json({error:'Invalid version'},400);
   const body=await kv.get('snapshot:'+version,'stream');
   if(!body)return json({error:'共用版本尚在傳播，請稍後重新整理'},404);
   return new Response(body,{headers});
  }
  if(request.method!=='POST')return json({error:'Not found'},404);
  if(url.pathname==='/update/start'){
   const first=metadata(await google());
   if(first.tabs.length>100)throw Error('分頁數量超出目前支援範圍，保留原共用版本');
   const published=await kv.get('latest','json');
   if(published?.revision===first.revision)return json({unchanged:true,manifest:published});
   const session=crypto.randomUUID();
   await kv.put('session:'+session,JSON.stringify(first),{expirationTtl:3600});
   return json({...first,session});
  }
  const session=url.searchParams.get('session');if(!uuid(session))return json({error:'Invalid session'},400);
  const first=await kv.get('session:'+session,'json');
  if(!first)return json({error:'更新作業尚未就緒或已逾時，請稍後重試'},409);
  if(url.pathname==='/update/tab'){
   const tab=url.searchParams.get('tab');if(!first.tabs.some(t=>t.id===tab))return json({error:'Invalid tab'},400);
   const source=await google(tab);
   await kv.put('stage:'+session+':'+tab,source,{expirationTtl:3600});
   return json({ok:true});
  }
  if(url.pathname==='/update/commit'){
   const keys=first.tabs.map(t=>'stage:'+session+':'+t.id);
   const sources=await kv.get(keys,'text');
   if(keys.some(key=>!sources.get(key)))return json({error:'部分分頁尚未完成，請稍後重新按更新文件；原共用版本未變更'},409);
   const last=metadata(await google());
   if(JSON.stringify(first)!==JSON.stringify(last))return json({error:'下載期間 Google 文件有新修改，請再按一次更新文件'},409);
   const version=crypto.randomUUID(),updatedAt=new Date().toISOString();
   const snapshot=JSON.stringify({documentId:DOC_ID,revision:first.revision,updatedAt,tabs:first.tabs.map(tab=>({...tab,source:sources.get('stage:'+session+':'+tab.id)}))});
   if(new TextEncoder().encode(snapshot).length>24*1024*1024)throw Error('共用版本過大，保留原共用版本');
   // Only server-fetched Google content is published; clients cannot upload script text.
   // Stage records expire. Published snapshots are immutable and remain available.
   await kv.put('snapshot:'+version,snapshot);
   const manifest={version,revision:first.revision,updatedAt};
   await kv.put('latest',JSON.stringify(manifest));
   return json(manifest);
  }
  return json({error:'Not found'},404);
 }catch(error){return json({error:error.message||'共用更新失敗，請稍後重試'},503);}
}};
