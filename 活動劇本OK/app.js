(() => {
'use strict';
let data = JSON.parse(document.getElementById('saved-document').textContent);
let pages = [], links = [], current = 0, busy = false;
const picker = document.getElementById('page-select');
const status = document.getElementById('sync-status');
const refresh = document.getElementById('refresh');
const live = /^https?:$/.test(location.protocol);
const read = key => {try{return localStorage.getItem(key);}catch{return null;}};
const save = (key,value) => {try{localStorage.setItem(key,value);}catch{}};
const pageId = id => 'tab-' + id.replaceAll('.','-');
const stamp = value => new Date(value).toLocaleString('zh-TW',{timeZone:'Asia/Taipei',hour12:false});
// Personal reading settings use only names from the source roster and observed roles.
const personSelect = document.getElementById('person-select');
const personalBar = document.getElementById('personal-bar');
const roleGroups = [
 ['緘默'], ['布魯斯韋恩','布魯斯·韋恩','布魯斯．韋恩','布魯斯','韋恩先生'],
 ['小丑'], ['双面人','雙面人','哈維丹特','哈維·丹特','哈維．丹特','丹特'],
 ['哈利奎茵','哈莉奎茵','哈莉·奎茵','哈莉．奎茵','哈莉','哈利','小丑女','哈琳·昆澤','哈琳．昆澤','哈琳'],
 ['毒藤女','毒藤','艾薇'], ['企鵝人','柯波特','奧斯華德'], ['謎語人','尼格瑪'],
 ['艾森'], ['阿黛爾','阿黛兒','阿戴爾','阿戴兒'], ['貓女'], ['廣播','列車廣播']
];
const cleanRole = text => text.replace(/[\s．·]/g,'');
const expandRoles = roles => [...new Set(roles.flatMap(role => roleGroups.find(group=>group.some(a=>cleanRole(a)===cleanRole(role))) || [role]))];
let roleTokens=[];
let people=[], selectedPerson=read('tea-script-person') || '', matches=[], matchIndex=-1;
function buildPeople(){
 const previous=selectedPerson;people=[];
 const roster=data.tabs.find(t=>t.title.includes('人員'));
 if(roster){
  const node=document.createElement('div');node.innerHTML=roster.html;
  let actors=false;
  node.querySelectorAll('p').forEach(p=>{
   const text=p.textContent.trim();
   if(/^ST\s*[：:]$/i.test(text)){actors=true;return;}
   if(!text)return;
   const actor=actors && text.match(/^([^()（）：:]{1,20})[（(]([^()（）]+)[)）]$/);
   if(actor){const name=actor[1].trim(),roles=actor[2].split(/[／/、]/).map(s=>s.trim());people.push({id:name,name,roles,aliases:[name,...expandRoles(roles)],actor:true});return;}
   const staff=text.match(/^(機動人員|燈控|音控|攝影)\s*[：:]\s*(.+)$/);
   if(staff){actors=false;staff[2].split(/[、，,]/).map(s=>s.trim()).filter(Boolean).forEach(name=>people.push({id:name,name,roles:[staff[1]],aliases:[name,staff[1]],actor:false}));}
  });
 }
 // Explicit cast assignment supplied by the user; keep it across source refreshes.
 const xiaoQi=people.find(p=>p.name==='蕭杞');
 if(xiaoQi){xiaoQi.roles=[...new Set([...xiaoQi.roles,'蝙蝠俠'])];xiaoQi.aliases=[...new Set([...xiaoQi.aliases,'蝙蝠俠'])];}
 const cat=people.find(p=>p.aliases.includes('貓女'));
 if(cat){cat.id='喛歌';cat.name='喛歌';cat.actor=true;cat.aliases=[...new Set([...cat.aliases,'喛歌'])];}
 else people.push({id:'喛歌',name:'喛歌',roles:['貓女'],aliases:['喛歌','貓女'],actor:true});
 // A role without a named performer remains a role-only option.
 const script=data.tabs.find(t=>t.title==='腳本');const scriptText=document.createElement('div');scriptText.innerHTML=script?.html||'';
 for(const role of ['貓女','廣播']){
  if(scriptText.textContent.includes(role)&&!people.some(p=>p.aliases.includes(role)))people.push({id:'role:'+role,name:role,roles:[role],aliases:expandRoles([role]),actor:true,roleOnly:true});
 }
 personSelect.replaceChildren(new Option('未選擇', ''));
 for(const [label,filter] of [['演員',p=>p.actor&&!p.roleOnly],['工作人員',p=>!p.actor],['角色（未列演員）',p=>p.roleOnly]]){
  const entries=people.filter(filter);if(!entries.length)continue;
  const group=document.createElement('optgroup');group.label=label;
  entries.forEach(p=>group.append(new Option(p.roleOnly?p.name:`${p.name}（${p.roles.join('／')}）`,p.id)));personSelect.append(group);
 }
 roleTokens=[...new Set([...people.flatMap(p=>p.aliases),...roleGroups.flat()])].sort((a,b)=>b.length-a.length);
 selectedPerson=people.some(p=>p.id===previous)?previous:'';personSelect.value=selectedPerson;
}
function mentions(text,person){
 // Match complete known role tokens first, so 小丑 does not match 小丑女.
 const aliases=roleTokens;
 for(let i=0;i<text.length;){
  const token=aliases.find(a=>text.startsWith(a,i));
  if(token){if(person.aliases.includes(token))return true;i+=token.length;}else i++;
 }
 return false;
}
// This exchange is spoken only by the five prisoners specified by the user.
// Use the surrounding lines to keep every other collective line unchanged.
function isPrisonerAgreement(element){
 const normalize=s=>s.replace(/\s/g,'').replace(/（/g,'(').replace(/）/g,')').replace(/:/g,'：');
 if(element.closest('.page')?.dataset.title!=='腳本'||normalize(element.textContent)!=='所有人：是(對啊)')return false;
 let before=element.previousElementSibling,after=element.nextElementSibling;
 while(before&&!before.textContent.trim())before=before.previousElementSibling;
 while(after&&!after.textContent.trim())after=after.nextElementSibling;
 return normalize(before?.textContent||'')==='雙面人：你們認真的嗎？'&&normalize(after?.textContent||'')==='小丑：我反對(很大聲)';
}
function dialogue(text,person,prisonerAgreement=false){
 const value=text.trim().replace(/^(?:[（(][^()（）]*[)）]\s*)+/,'');
 const colon=value.search(/[：:]/);if(colon<0||colon>32)return null;
 const prefix=value.slice(0,colon).replace(/[（(][^()（）]*[)）]/g,'').trim();
 const speakers=prefix.split(/[、，,／/&＆]|以及|和|與/).map(s=>s.trim());
 if(prisonerAgreement)return {own:['哈莉','雙面人','謎語人','毒藤女','企鵝人'].some(role=>person.aliases.includes(role)),standalone:false};
 const own=speakers.some(s=>person.aliases.some(a=>cleanRole(s)===cleanRole(a))) || (person.actor&&['所有人','全員'].includes(prefix));
 const known=own||speakers.every(s=>people.some(p=>p.aliases.some(a=>cleanRole(s)===cleanRole(a)))||['所有人','全員'].includes(s));
 return known?{own,standalone:!value.slice(colon+1).trim()}:null;
}
function highlightAll(){
 const person=people.find(p=>p.id===selectedPerson);
 pages.forEach((page,index)=>{
  page.querySelectorAll('.personal-line,.personal-mention').forEach(p=>p.classList.remove('personal-line','personal-mention'));
  let continuation=false,ownCount=0,mentionCount=0;
  if(person)page.querySelectorAll('.document p,.document li,.document h1,.document h2,.document h3,.document h4').forEach(p=>{
   if(p.closest('.scene-toc')||(p.tagName==='LI'&&p.querySelector('p,li')))return;
   const text=p.textContent.trim();if(!text)return;
   const line=dialogue(text,person,isPrisonerAgreement(p));
   const own=Boolean(line?.own)||(continuation&&!line&&!/^[（(]|^H[1-6]$/.test(text)&&p.tagName==='P');
   if(line)continuation=line.own&&line.standalone;else if(text)continuation=false;
   if(own){p.classList.add('personal-line');ownCount++;}
   else if(mentions(text,person)){p.classList.add('personal-mention');mentionCount++;}
  });
  page.dataset.ownCount=ownCount;page.dataset.mentionCount=mentionCount;
  const link=links[index];link.classList.toggle('personal-related',Boolean(person&&mentions(data.tabs[index].title,person)));link.querySelector('.personal-badge')?.remove();
  if(person&&ownCount+mentionCount){const badge=document.createElement('span');badge.className='personal-badge';badge.textContent=ownCount+mentionCount;badge.title=`我的台詞 ${ownCount} 處，提到我 ${mentionCount} 處`;link.append(badge);}
 });
 updatePersonalBar();
}
function updatePersonalBar(){
 const person=people.find(p=>p.id===selectedPerson);personalBar.hidden=!person;matchIndex=-1;
 if(!person){matches=[];return;}
 const page=pages[current];matches=[...page.querySelectorAll('.personal-line,.personal-mention')];
 const counts=document.getElementById('personal-counts');counts.replaceChildren();
 const own=document.createElement('span');own.className='own-legend';own.textContent=`我的台詞 ${page.dataset.ownCount||0} 處`;
 const mention=document.createElement('span');mention.className='mention-legend';mention.textContent=`提到我 ${page.dataset.mentionCount||0} 處`;
 counts.append(own,mention);document.getElementById('previous-match').disabled=!matches.length;document.getElementById('next-match').disabled=!matches.length;
}
function jumpMatch(delta){
 if(!matches.length)return;
 matchIndex=matchIndex<0?(delta>0?0:matches.length-1):(matchIndex+delta+matches.length)%matches.length;
 const target=matches[matchIndex];let parent=target.parentElement;while(parent){if(parent.tagName==='DETAILS')parent.open=true;parent=parent.parentElement;}
 target.tabIndex=-1;target.focus({preventScroll:true});target.scrollIntoView({block:'center',behavior:'instant'});
}
personSelect.onchange=()=>{selectedPerson=personSelect.value;save('tea-script-person',selectedPerson);highlightAll();};
document.getElementById('previous-match').onclick=()=>jumpMatch(-1);document.getElementById('next-match').onclick=()=>jumpMatch(1);
const themeButton=document.getElementById('theme-toggle');
function applyTheme(theme){document.documentElement.dataset.theme=theme;themeButton.textContent=theme==='dark'?'白版':'黑版';themeButton.setAttribute('aria-label','切換至'+themeButton.textContent);save('tea-script-theme',theme);}
themeButton.onclick=()=>applyTheme(document.documentElement.dataset.theme==='light'?'dark':'light');
applyTheme(read('tea-script-theme')==='light'?'light':'dark');

function makeLink(tab,index,label) {
 const a=document.createElement('a');a.href='#'+pageId(tab.id);a.dataset.page=pageId(tab.id);
 const number=document.createElement('small');number.textContent=String(index+1).padStart(2,'0');
 const name=document.createElement('span');name.textContent=label||tab.title;a.append(number,name);return a;
}
function render(next) {

 const closed=new Set([...document.querySelectorAll('.nav-section:not([open])')].map(d=>d.dataset.tab));
 data=next;const navigation=document.getElementById('navigation');navigation.replaceChildren();picker.replaceChildren();
 const parents=new Map(), allPages=document.createDocumentFragment();
 data.tabs.forEach((tab,index)=>{
  const container=tab.parent ? parents.get(tab.parent) : navigation;
  const hasChildren=data.tabs.some(t=>t.parent===tab.id);
  if(hasChildren){
   const details=document.createElement('details');details.className='nav-section';details.dataset.tab=tab.id;details.open=!matchMedia('(max-width:850px)').matches&&!closed.has(tab.id);
   const summary=document.createElement('summary');summary.textContent=tab.title;details.append(summary,makeLink(tab,index));container.append(details);parents.set(tab.id,details);
  } else container.append(makeLink(tab,index));
  const option=document.createElement('option');option.value=pageId(tab.id);option.textContent='　'.repeat(tab.depth)+tab.title;picker.append(option);
  const section=document.createElement('section');section.className='page';section.id=pageId(tab.id);section.dataset.title=tab.title;section.hidden=true;
  const style=document.createElement('style');style.textContent=tab.css;section.append(style);
  const detail=document.createElement('details');detail.open=true;detail.className='content-section';
  const summary=document.createElement('summary');summary.textContent='本頁內容';const hint=document.createElement('span');hint.textContent='點選收合／展開';summary.append(hint);detail.append(summary);
  const content=document.createElement('div');content.className='document';content.id=tab.contentId;content.innerHTML=tab.html;
  content.querySelectorAll('p').forEach(p=>{if(!p.textContent.trim()&&!p.querySelector('img,br,[id]'))p.classList.add('is-empty');});
  content.querySelectorAll('table').forEach(table=>{const wrap=document.createElement('div');wrap.className='table-scroll';wrap.tabIndex=0;wrap.setAttribute('role','region');wrap.setAttribute('aria-label','可左右捲動的表格');table.before(wrap);wrap.append(table);});
  content.querySelectorAll('img').forEach(img=>{img.parentElement.classList.add('image-wrap');if(!img.alt)img.alt='原文件附圖';});
  if(tab.title==='腳本'){
   const headings=[...content.querySelectorAll('h1,h2,h3,h4')].filter(h=>h.textContent.trim());
   if(headings.length){const toc=document.createElement('details');toc.className='scene-toc';toc.open=true;const label=document.createElement('summary');label.textContent='場次目錄・點選跳至該段';const list=document.createElement('div');headings.forEach((h,i)=>{if(!h.id)h.id=section.id+'-scene-'+i;const a=document.createElement('a');a.href='#'+h.id;a.textContent=h.textContent;list.append(a);});toc.append(label,list);content.prepend(toc);}
  }
  if(!content.textContent.trim()&&!content.querySelector('img,table')){const empty=document.createElement('p');empty.className='empty-state';empty.textContent='此分頁目前沒有內容。';detail.append(empty);}
  detail.append(content);section.append(detail);allPages.append(section);
 });
 document.getElementById('pages').replaceChildren(allPages);pages=[...document.querySelectorAll('.page')];links=[...navigation.querySelectorAll('a')];
 buildPeople();route(false);highlightAll();
}
function show(index,scroll=false){
 current=index;pages.forEach((p,i)=>p.hidden=i!==index);
 links.forEach((a,i)=>{if(i===index)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
 picker.value=pages[index].id;document.getElementById('page-title').textContent=data.tabs[index].title;
 document.getElementById('counter').textContent=`第 ${index+1} / ${pages.length} 頁`;
 document.title=data.tabs[index].title+'｜反派茶會';document.getElementById('previous').disabled=index===0;document.getElementById('next').disabled=index===pages.length-1;
 updatePersonalBar();
 save('tea-script-page',pages[index].id);if(scroll)document.getElementById('reading').scrollIntoView({behavior:'instant'});
}
function route(scroll=true){
 let id;try{id=decodeURIComponent(location.hash.slice(1));}catch{id='';}
 const target=document.getElementById(id), section=target?.closest('.page');
 if(section){show(pages.indexOf(section),scroll);if(target!==section){let ancestor=target.parentElement;while(ancestor&&ancestor!==section){if(ancestor.tagName==='DETAILS')ancestor.open=true;ancestor=ancestor.parentElement;}requestAnimationFrame(()=>target.scrollIntoView());}return;}
 if(id==='reading'){document.getElementById('reading').scrollIntoView();return;}
 const remembered=pages.findIndex(p=>p.id===read('tea-script-page'));show(remembered>=0?remembered:0,scroll);
}
const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
async function request(url,options={}){
 const response=await fetch(url,{cache:'no-store',signal:AbortSignal.timeout(15000),...options});
 if(!response.ok)throw Error('無法連接更新服務');return response.json();
}
async function synchronize(){
 if(busy)return;
 if(!live){status.textContent=`本機保存版：${stamp(data.updatedAt)}。自動更新請使用同資料夾的「開啟並更新.cmd」。`;return;}
 busy=true;refresh.disabled=true;status.textContent='正在確認 Google 文件版本…';
 try{
  await request('/api/sync',{method:'POST'});
  let state;
  const deadline=Date.now()+8*60*1000;
  do{await wait(1000);state=await request('/api/status');status.textContent=state.message;if(Date.now()>deadline)throw Error('更新時間較長，請稍後再試');}while(state.running);
  if(state.error)throw Error(state.message);
  const next=await request('/api/document');
  if(next.revision!==data.revision)render(next);else data=next;
  status.textContent=`已確認最新版本：${stamp(next.checkedAt)}`;
 }catch(error){status.textContent=`${error.message}。目前顯示保存版：${stamp(data.updatedAt)}`;}
 finally{busy=false;refresh.disabled=false;}
}
picker.onchange=()=>location.hash=picker.value;
window.addEventListener('hashchange',()=>route());
document.getElementById('previous').onclick=()=>{if(current>0)location.hash=pages[current-1].id;};
document.getElementById('next').onclick=()=>{if(current<pages.length-1)location.hash=pages[current+1].id;};
let size=Math.min(26,Math.max(16,Number(read('tea-script-font'))||18));
function font(delta=0){size=Math.min(26,Math.max(16,size+delta));document.documentElement.style.setProperty('--reading-size',size+'px');save('tea-script-font',size);document.getElementById('smaller').disabled=size===16;document.getElementById('larger').disabled=size===26;}
document.getElementById('smaller').onclick=()=>font(-2);document.getElementById('larger').onclick=()=>font(2);
document.getElementById('print').onclick=()=>window.print();
window.addEventListener('beforeprint',()=>pages[current].querySelectorAll('details').forEach(d=>{d.dataset.beforePrint=d.open?'open':'closed';d.open=true;}));
window.addEventListener('afterprint',()=>pages[current].querySelectorAll('details').forEach(d=>{if(d.dataset.beforePrint)d.open=d.dataset.beforePrint==='open';}));
refresh.onclick=synchronize;font();render(data);synchronize();
})();
