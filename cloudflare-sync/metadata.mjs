function jsonObjectAt(source,start){
 let depth=0,string=false,escape=false;
 for(let i=start;i<source.length;i++){
  const c=source[i];
  if(string){if(escape)escape=false;else if(c==='\\')escape=true;else if(c==='"')string=false;continue;}
  if(c==='"')string=true;else if(c==='{')depth++;else if(c==='}'&&!--depth)return JSON.parse(source.slice(start,i+1));
 }
 throw Error('Google 文件資料不完整，保留保存版');
}
function metadata(source){
 const match=/DOCS_modelChunk\s*=\s*(?=\{)/.exec(source);
 if(!match)throw Error('無法讀取 Google 文件分頁；請確認文件允許直接檢視');
 const model=jsonObjectAt(source,match.index+match[0].length);
 if(!Array.isArray(model.chunk)||model.revision==null)throw Error('Google 分頁格式已改變，保留保存版');
 const tree=[];
 const siblings=path=>{let list=tree;for(const i of path){if(!Number.isInteger(i)||!list[i])throw Error('分頁階層異常');list=list[i].children;}return list;};
 const properties=list=>{const p=new Map();for(let i=0;i<list.length;i+=2)p.set(list[i],list[i+1]);return p;};
 for(const command of model.chunk){
  const d=command.d;
  if(command.ty==='mkch')tree.push({id:'t.0',title:properties(d[0]).get(1),children:[]});
  else if(command.ty==='ac'){
   const [id,props,path]=d;if(!/^t\.[a-zA-Z0-9]+$/.test(id)||!path.length)throw Error('分頁編號異常');
   const list=siblings(path.slice(0,-1)),index=path[path.length-1];if(index<0||index>list.length)throw Error('分頁次序異常');
   list.splice(index,0,{id,title:properties(props).get(1),children:[]});
  }else if(command.ty==='mch'){
   const [from,to]=d,item=siblings(from.slice(0,-1)).splice(from[from.length-1],1)[0];
   if(!item)throw Error('分頁階層異常');siblings(to.slice(0,-1)).splice(to[to.length-1],0,item);
  }
 }
 const tabs=[];const walk=(nodes,depth=0,parent=null)=>nodes.forEach(n=>{if(typeof n.title!=='string')throw Error('分頁名稱異常');tabs.push({id:n.id,title:n.title,depth,parent});walk(n.children,depth+1,n.id);});walk(tree);
 if(!tabs.length||new Set(tabs.map(t=>t.id)).size!==tabs.length)throw Error('Google 分頁資料異常');
 return {tabs,revision:String(model.revision)};
}

export {metadata};
