(() => {
  'use strict';
  const KEY='traitor_arg_save_v1';
  const THANK_YOU_DELAY_SECONDS=4;
  const people={
    deputy:{name:'副手',avatar:'assets/deputy.webp'},
    john:{name:'約翰',avatar:'assets/john.webp'},
    arthur:{name:'亞瑟',avatar:'assets/arthur.webp'},
    merlin:{name:'梅林',avatar:'assets/merlin.webp'},
    gawain:{name:'高文',avatar:'assets/gawain.webp'},
    ethan:{name:'伊森',avatar:'assets/ethan.webp'},
    percival:{name:'帕西瓦爾',avatar:'assets/percival.webp'},
    diana:{name:'黛安娜',avatar:'assets/diana.webp'},
    Oven:{name:'歐文',avatar:'assets/Oven.webp'},
    me:{name:'你',avatar:'assets/me.webp'}
  };
  const opening=['deputy','我聽老大說我們家族內部有叛徒，他把重要文件藏起來了。'];
  const intro=[
    ['deputy','以下是七位嫌疑人的說詞，\n七名嫌疑人中只有一位叛徒，\n而且只有叛徒說真話，其餘六人都在說謊。\n請你找出叛徒，並判斷文件藏在哪裡。'],
    ['john','亞瑟、梅林之中有人是叛徒，或者文件在抽屜裡。'],
    ['arthur','我不是叛徒，而且文件在書架上。'],
    ['merlin','約翰、黛安娜之中有人是叛徒，或者文件在書架上。'],
    ['gawain','梅林是叛徒，或者文件不在保險箱裡。'],
    ['ethan','文件在保險箱裡，而且約翰和帕西瓦爾都不是叛徒。'],
    ['percival','伊森是叛徒，而且文件不在保險箱裡。'],
    ['diana','高文是叛徒，而且文件在保險箱裡。'],
    ['deputy','注意事項：\n「或者」表示至少一項成立，兩項都成立也算真。\n「而且」必須兩項都成立才算真。發言為假，是指整句為假，不代表句中每個部分都為假。'],
    ['deputy','現在，請問誰是叛徒？']
  ];
  const chats=[
    {game:true,group:true,avatar:'assets/BLACK.webp',name:'抓叛徒群組 (9)',preview:'副手：我聽老大說我們家族內部有叛徒',time:'現在',badge:1,pinned:true},
    {avatar:'assets/bblock.webp',name:'B棟八卦集中營 (11)',preview:'湯瑪士：昨晚二樓又有人被叫走耶',time:'15:42',badge:3,memberAvatars:{'湯瑪士':'assets/thomas.webp','盧卡斯':'assets/lucas.webp','亨利':'assets/henry.webp'},msgs:[['湯瑪士','慘叫超大聲的，一定又是艾森幹的。'],['盧卡斯','那女人根本神經病。'],['亨利','當作沒聽見吧。']]},
    {avatar:'assets/hideout.webp',name:'潘',preview:'潘：舊收音機後面的空間好像還...',time:'14:07',msgs:[['潘','舊收音機後面的空間好像還能放一支。'],['你','那裡搜房時第一個就會被翻啦'],['潘','那你覺得床架接縫呢。'],['你','我不是藏那裡，但你可以試試看']]},
    {avatar:'assets/yard.webp',name:'里歐',preview:'里歐：欸，今天的放風延後二十分...',time:'昨天',msgs:[['里歐','欸，今天的放風延後二十分鐘。'],['你','又延？'],['里歐','門口已經貼通知了。']]},
    {avatar:'assets/gawain.webp',name:'高文 C-17',preview:'今晚先不要聯絡我',time:'昨天',msgs:[['高文','今晚先不要聯絡我。'],['你','怎麼了？'],['高文','瘋女人又來臨時檢查，等我主動找你。']]},
    {avatar:'assets/supplies.webp',name:'物資交換群 (16)',preview:'柯爾：兩包咖啡換充電線',time:'週一',memberAvatars:{'柯爾':'assets/cole.webp','伊恩':'assets/ian.webp'},msgs:[['柯爾','兩包咖啡換一條 Type-C 充電線。'],['伊恩','只有短線，要嗎？'],['柯爾','可以，晚點在洗衣間交換。']]},
  ];
  let state=load(),activeChat=0,introTimer=null,thanksTimer=null;
  const home=document.getElementById('homeView'),chat=document.getElementById('chatView'),messages=document.getElementById('messages');
  function load(){try{const x=JSON.parse(localStorage.getItem(KEY));if(x&&x.version===1){const map={arthur:'john',bella:'arthur',caleb:'merlin',diana:'gawain',fiona:'percival',gavin:'diana',ethan:'ethan'};x.target=map[x.target]||x.target;x.extra=(x.extra||[]).map(m=>({...m,who:map[m.who]||m.who}));x.revealed=intro.length;x.version=2}if(x&&x.version===2){x.readChats=x.readChats||[];x.thanksShown=x.thanksShown??x.extra.some(m=>m.text.includes('幫我找出叛徒'));x.bloodPlayed=x.bloodPlayed??(x.finished&&x.target==='ethan');return x}}catch(e){}return{version:2,started:false,revealed:0,stage:'answer',target:null,choice:null,extra:[],finished:false,readChats:[],thanksShown:false,bloodPlayed:false}}
  function save(){localStorage.setItem(KEY,JSON.stringify(state))}
  function avatarHTML(person,extra='',override=''){const p=people[person]||people.deputy;return `<img class="avatar ${extra}" data-person="${person}" src="${override||p.avatar}" alt="${p.name}的頭貼">`}
  function solved(){return state.finished&&state.target==='ethan'}
  function gamePreview(){if(solved()&&state.thanksShown)return'副手：謝謝你幫我找出叛徒。';if(state.extra.length){const m=state.extra[state.extra.length-1],p=people[m.who]||people.me;return`${p.name}：${m.text}`}if(state.started&&state.revealed){const m=intro[Math.min(state.revealed,intro.length)-1];return`${people[m[0]].name}：${m[1]}`}return chats[0].preview}
  function renderHome(){document.getElementById('chatList').innerHTML=chats.map((c,i)=>`<button class="chat-row ${c.pinned?'pinned':''}" data-chat="${i}">${avatarHTML(c.group?'deputy':'deputy',c.group?'group':'',c.avatar)}<span class="row-main"><span class="row-name">${c.name}</span><span class="row-preview">${i===0?gamePreview():c.preview}</span></span><span class="row-time">${c.time}${c.badge&&!state.readChats.includes(i)?`<b class="badge">${c.badge}</b>`:''}</span></button>`).join('');document.querySelectorAll('[data-chat]').forEach(b=>b.onclick=()=>openChat(Number(b.dataset.chat)))}
  function addMessage(who,text,isMe=false,displayName='',avatar=''){const p=people[who]||people.me;const el=document.createElement('div');el.className='message'+(isMe?' me':'');el.innerHTML=`${avatarHTML(who,'',avatar)}<div class="msg-body"><div class="sender">${displayName||p.name}</div><div class="bubble"></div><div class="stamp">${new Date().toLocaleTimeString('zh-TW',{hour:'2-digit',minute:'2-digit',hour12:false})}</div></div>`;el.querySelector('.bubble').textContent=text;messages.appendChild(el);return el}
  function showBloodFinal(){const video=document.getElementById('blood'),still=document.getElementById('bloodStill');video.pause();video.classList.remove('show');still.classList.add('show')}
  function hideBlood(){const video=document.getElementById('blood'),still=document.getElementById('bloodStill');video.pause();video.currentTime=0;video.classList.remove('show');still.classList.remove('show')}
  function playBlood(){const video=document.getElementById('blood'),still=document.getElementById('bloodStill');still.classList.remove('show');video.classList.add('show');video.currentTime=0;video.onended=showBloodFinal;const p=video.play();if(p)p.catch(()=>showBloodFinal())}
  function playGunshot(){const audio=document.getElementById('gunshot');audio.currentTime=0;const p=audio.play();if(p)p.catch(()=>{})}
  function addFinishedNote(){if(document.getElementById('finishedNote'))return;const n=document.createElement('div');n.id='finishedNote';n.className='finished-note';n.textContent='本次調查已結束，所有紀錄均已保存。';messages.appendChild(n)}
  function showThanks(){if(state.thanksShown)return;const thanks={who:'deputy',text:'謝謝你幫我找出叛徒。'};state.extra.push(thanks);state.thanksShown=true;addMessage(thanks.who,thanks.text);addFinishedNote();save();if(home.classList.contains('active'))renderHome();scrollBottom()}
  function queueThanks(){clearTimeout(thanksTimer);if(state.thanksShown)return;if(!state.thanksDueAt){state.thanksDueAt=Date.now()+THANK_YOU_DELAY_SECONDS*1000;save()}thanksTimer=setTimeout(showThanks,Math.max(0,state.thanksDueAt-Date.now()))}
  function scrollBottom(){requestAnimationFrame(()=>messages.scrollTop=messages.scrollHeight)}
  function revealNext(){if(state.revealed>=intro.length||state.finished)return;const m=intro[state.revealed];addMessage(m[0],m[1]);state.revealed++;save();syncComposer();scrollBottom();if(state.revealed<intro.length)introTimer=setTimeout(revealNext,650)}
  function renderChat(){clearTimeout(introTimer);messages.innerHTML='<div class="day"><span>今天</span></div>';addMessage(opening[0],opening[1]);intro.slice(0,state.revealed).forEach(m=>addMessage(m[0],m[1]));state.extra.forEach(m=>addMessage(m.who,m.text,m.me));if(state.stage==='question'&&!state.finished)renderOptions();if(solved()){if(state.bloodPlayed)showBloodFinal();else{playBlood();playGunshot();state.bloodPlayed=true;save()}redAvatar();queueThanks()}else hideBlood();if(state.finished&&(!solved()||state.thanksShown))addFinishedNote();syncComposer();scrollBottom();if(state.revealed<intro.length&&!state.finished)introTimer=setTimeout(revealNext,650)}
  function renderOrdinary(c){messages.innerHTML='<div class="day"><span>今天</span></div>';c.msgs.forEach(m=>{const isMe=m[0]==='你';const memberAvatar=c.memberAvatars?.[m[0]]||c.avatar;addMessage(isMe?'me':'deputy',m[1],isMe,m[0],isMe?'':memberAvatar)});hideBlood();const input=document.getElementById('answerInput'),btn=document.getElementById('sendBtn');input.disabled=true;btn.disabled=true;input.placeholder='此對話僅供查看';scrollBottom()}
  function openChat(index,push=true){activeChat=index;const c=chats[index];if(!state.readChats.includes(index))state.readChats.push(index);document.getElementById('chatTitle').textContent=c.name;home.classList.remove('active');chat.classList.add('active');if(c.game){state.started=true;save();renderChat()}else{save();renderOrdinary(c)}if(push)history.pushState({chat:index},'',`#chat-${index}`)}
  function goHome(){hideBlood();chat.classList.remove('active');home.classList.add('active');renderHome();history.replaceState({},'','#')}
  function submitAnswer(e){e.preventDefault();if(state.stage!=='answer'||state.finished||state.revealed<intro.length)return;const input=document.getElementById('answerInput');const raw=input.value.trim();if(!raw)return;const names={john:'約翰',arthur:'亞瑟',merlin:'梅林',gawain:'高文',percival:'帕西瓦爾',ethan:'伊森',diana:'黛安娜'};const matched=Object.keys(names).filter(k=>raw.includes(names[k]));const mine={who:'me',text:raw,me:true};state.extra.push(mine);addMessage(mine.who,mine.text,true);input.value='';if(matched.length===0){const reply={who:'deputy',text:'你在說什麼？重答一次。'};state.extra.push(reply);addMessage(reply.who,reply.text);save();scrollBottom();return}if(matched.length>1){const reply={who:'deputy',text:'叛徒只有一個，請重答。'};state.extra.push(reply);addMessage(reply.who,reply.text);save();scrollBottom();return}state.target=matched[0];state.stage='question';const reply={who:'deputy',text:'你現在可以問他一個問題了。'};state.extra.push(reply);addMessage(reply.who,reply.text);renderOptions();save();syncComposer();scrollBottom()}
  function renderOptions(){const wrap=document.createElement('div');wrap.className='question-options';['１１１','２２２','３３３','４４４'].forEach((label,i)=>{const b=document.createElement('button');b.className='option';b.textContent=label;b.onclick=()=>chooseQuestion(i);wrap.appendChild(b)});messages.appendChild(wrap)}
  function chooseQuestion(i){if(state.stage!=='question'||state.finished)return;const labels=['１１１','２２２','３３３','４４４'],answers=['１２３','456','789','1112'];document.querySelector('.question-options')?.remove();state.choice=i;const mine={who:'me',text:labels[i],me:true};state.extra.push(mine);addMessage(mine.who,mine.text,true);const isTraitor=state.target==='ethan';if(isTraitor){const answer={who:'ethan',text:answers[i]};state.extra.push(answer);addMessage(answer.who,answer.text);state.finished=true;state.stage='finished';state.thanksShown=false;state.thanksDueAt=Date.now()+THANK_YOU_DELAY_SECONDS*1000;playBlood();playGunshot();state.bloodPlayed=true;redAvatar();queueThanks()}else{const refusal={who:state.target,text:'我為什麼要告訴你？'};state.extra.push(refusal);addMessage(refusal.who,refusal.text);state.finished=true;state.stage='finished';addFinishedNote()}save();syncComposer();scrollBottom()}
  function redAvatar(){document.querySelectorAll('[data-person="ethan"]').forEach(a=>a.classList.add('red'))}
  function syncComposer(){const input=document.getElementById('answerInput'),btn=document.getElementById('sendBtn');const introducing=state.revealed<intro.length;const disabled=state.stage!=='answer'||state.finished||introducing;input.disabled=disabled;btn.disabled=disabled;input.placeholder=introducing?'請稍候……':'輸入叛徒的名字';if(state.stage==='question')input.placeholder='請選擇上方的一個問題';if(state.finished)input.placeholder='本次遊戲已結束'}
  document.getElementById('answerForm').addEventListener('submit',submitAnswer);document.getElementById('backBtn').onclick=goHome;window.addEventListener('popstate',goHome);
  function updateClock(){const now=new Date().toLocaleTimeString('zh-TW',{hour:'2-digit',minute:'2-digit',hour12:false});document.querySelectorAll('.clock').forEach(el=>el.textContent=now)}updateClock();setInterval(updateClock,1000);document.addEventListener('visibilitychange',updateClock);renderHome();
  if(location.hash.startsWith('#chat-')){const i=Number(location.hash.slice(6));if(chats[i])openChat(i,false)}
})();
