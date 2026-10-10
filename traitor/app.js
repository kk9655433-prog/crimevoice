(() => {
  'use strict';
  const KEY='traitor_arg_save_v1';
  const THANK_YOU_DELAY_SECONDS=4;
  const HARASS_DELAY=5*60*1000, HARASS_INTERVAL=30*1000;
  const EXTRA_HARASS_MESSAGES=[
    '老大！你今天也帥得太過分了吧！',
    '老大早安午安晚安！先一次跟你說！',
    '老大！你有看到我剛剛那則嗎！',
    '老大！我又來了！有沒有想我！',
    '老大！回我一個字就好！一個字！',
    '老大！你不回我一定是在忙大事！',
    '老大！你的雨傘也太有品味了吧！',
    '老大！我可以幫你的雨傘撐傘嗎！',
    '老大！你的西裝根本是高譚時尚巔峰！',
    '老大！你走進來的時候我都想鼓掌！',
    '老大！我已經練好歡迎你的掌聲了！',
    '老大！高譚沒有你我要怎麼辦！',
    '老大！高譚之王這四個字就是為你發明的！',
    '老大！我宣布今天是企鵝人應援日！',
    '老大！明天也是企鵝人應援日！',
    '老大！你的名字我看一次就肅然起敬一次！',
    '老大！可以給我一張簽名照嗎！我要珍藏！',
    '老大！我想把你的名言抄滿整本筆記！',
    '老大！你咳一聲我都覺得很有威嚴！',
    '老大！你的氣場隔著手機都傳過來了！',
    '老大！我剛剛又跟別人說你有多厲害！',
    '老大！他們叫我安靜，但我還沒誇完你！',
    '老大！我可以當你的頭號粉絲嗎！',
    '老大！如果頭號有人了，那我排第二！',
    '老大！我對你的崇拜比監獄的牆還高！',
    '老大！這裡的飯不好吃，但想到你我就有精神！',
    '老大！今天放風我也有認真想你！',
    '老大！我連排隊都站得像你的小弟！',
    '老大！有沒有需要我大喊老大威武！',
    '老大威武！！！！！！',
    '老大！我幫你想好出場音效了！登登登登！',
    '老大！小丑有什麼了不起，你才是我的偶像！',
    '老大！冰山餐廳缺不缺專門誇你的員工！',
    '老大！我可以負責幫你喊「老大來了」！',
    '老大！你喝水了嗎！高譚之王也要喝水！',
    '老大！你吃飯了嗎！我可以精神上陪你吃！',
    '老大！我手機快沒電了但誇你不能停！',
    '老大！我不是在洗版，我是在表達忠誠！',
    '老大！最後再說一次！你真的超級無敵厲害！'
  ];
  const PENGUIN_GREETING='很好，現在我把你加到群組了，去群組幫我找出叛徒吧';
  const people={
    penguin:{name:'偉大的高譚之王',avatar:'assets/QP.jpg'},
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
    {avatar:'assets/bblock.webp',name:'B棟八卦集中營 (11)',preview:'湯瑪士：昨晚二樓又有人被叫走耶',time:'15:42',badge:3,memberAvatars:{'湯瑪士':'assets/thomas.webp','盧卡斯':'assets/lucas.webp','亨利':'assets/henry.webp'},msgs:[['湯瑪士','慘叫超大聲的，一定又是艾森幹的'],['盧卡斯','媽的，那女人根本神經病'],['亨利','你們最好當作沒聽見吧']]},
    {avatar:'assets/hideout.webp',name:'潘',preview:'舊收音機後面的空間好像還...',time:'14:07',msgs:[['潘','舊收音機後面的空間好像還能放一支。'],['你','那裡搜房時第一個就會被翻啦'],['潘','那你覺得床架接縫呢。'],['你','我不是藏那裡，但你可以試試看']]},
    {avatar:'assets/yard.webp',name:'里歐',preview:'欸，今天的放風延後二十分...',time:'昨天',msgs:[['里歐','欸，今天的放風延後二十分鐘。'],['你','又延？'],['里歐','門口已經貼通知了。']]},
    {avatar:'assets/gawain.webp',name:'高文 C-17',preview:'今晚先不要聯絡我',time:'昨天',msgs:[['高文','今晚先不要聯絡我。'],['你','怎麼了？'],['高文','瘋女人又來臨時檢查，等我主動找你。']]},
    {avatar:'assets/supplies.webp',name:'物資交換群 (16)',preview:'柯爾：兩包咖啡換充電線',time:'週一',memberAvatars:{'柯爾':'assets/cole.webp','伊恩':'assets/ian.webp'},msgs:[['柯爾','兩包咖啡換一條 Type-C 充電線。'],['伊恩','只有短線，要嗎？'],['柯爾','可以，晚點在洗衣間交換。']]},
  ];
  const PENGUIN_CHAT=chats.length;
  chats.push({penguin:true,avatar:people.penguin.avatar,name:people.penguin.name,pinned:true});
  let state=load(),activeChat=null,introTimer=null,thanksTimer=null,harassTimer=null;
  state.penguin=state.penguin||{deleted:false,unread:true,messages:[],sentCount:0};
  initializeTimes();
  let menuChat=null;
  const home=document.getElementById('homeView'),chat=document.getElementById('chatView'),messages=document.getElementById('messages');
  function load(){try{const x=JSON.parse(localStorage.getItem(KEY));if(x&&x.version===1){const map={arthur:'john',bella:'arthur',caleb:'merlin',diana:'gawain',fiona:'percival',gavin:'diana',ethan:'ethan'};x.target=map[x.target]||x.target;x.extra=(x.extra||[]).map(m=>({...m,who:map[m.who]||m.who}));x.revealed=intro.length;x.version=2}if(x&&x.version===2){x.readChats=x.readChats||[];x.thanksShown=x.thanksShown??x.extra.some(m=>m.text.includes('幫我找出叛徒'));x.bloodPlayed=x.bloodPlayed??(x.finished&&x.target==='ethan');return x}}catch(e){}return{version:2,started:false,revealed:0,stage:'answer',target:null,choice:null,extra:[],finished:false,readChats:[],thanksShown:false,bloodPlayed:false}}
  function save(){localStorage.setItem(KEY,JSON.stringify(state))}
  function initializeTimes(){
    const p=state.penguin,now=Date.now();
    p.addedAt=p.addedAt||state.groupOpenedAt||state.finishedAt||now;
    state.groupOpenedAt=state.groupOpenedAt||(state.started?p.addedAt:null);
    state.introAt=state.introAt||[];
    for(let i=0;i<state.revealed;i++)state.introAt[i]=state.introAt[i]||state.groupOpenedAt;
    if(state.finished)state.finishedAt=state.finishedAt||state.extra.at(-1)?.at||p.addedAt;
    state.extra.forEach(m=>{m.at=m.at||(m.text==='謝謝你幫我找出叛徒。'?state.thanksDueAt:null)||state.finishedAt||state.groupOpenedAt||p.addedAt});
    state.pins=state.pins||{};state.deletedFriends=state.deletedFriends||{};
    state.historyAt=state.historyAt||{};
    chats.forEach((c,i)=>{
      if(c.game||c.penguin||state.historyAt[i])return;
      const d=new Date(p.addedAt);
      if(c.time==='昨天'){d.setDate(d.getDate()-1);d.setHours(20,0,0,0)}
      else if(c.time==='週一'){d.setDate(d.getDate()-((d.getDay()+6)%7||7));d.setHours(18,0,0,0)}
      else{const [h,m]=c.time.split(':').map(Number);d.setHours(h,m,0,0);if(d.getTime()>p.addedAt)d.setDate(d.getDate()-1)}
      state.historyAt[i]=d.getTime();
    });
    // Older saves have no original times. Migrate once using the best saved anchor.
    if(!state.timeSchema){
      if(state.finished&&!p.deleted){
        if(solved())state.thanksDueAt=state.thanksDueAt||state.finishedAt+THANK_YOU_DELAY_SECONDS*1000;
        const start=(solved()?state.thanksDueAt:state.finishedAt)+HARASS_DELAY;
        p.messages.forEach((m,i)=>{m.at=start+i*HARASS_INTERVAL});
        p.nextAt=start+p.messages.length*HARASS_INTERVAL;
      }
      p.unread=!p.introduced&&!p.deleted;state.timeSchema=1;
    }
    p.sentCount=p.messages.length;
    if(p.intervalVersion!==1){
      // Keep existing history intact; continue one minute after the last send.
      if(state.finished&&!p.deleted)p.nextAt=p.messages.length?p.messages.at(-1).at+HARASS_INTERVAL:(solved()?state.thanksDueAt:state.finishedAt)+HARASS_DELAY;
      p.intervalVersion=1;
    }
    if(state.finished&&!Array.isArray(p.remainingMessages)){
      const sent=new Set(p.messages.map(m=>m.text));
      p.remainingMessages=harassmentPool().filter(text=>!sent.has(text));
    }
  }
  function formatTime(at){return new Date(at).toLocaleTimeString('zh-TW',{hour:'2-digit',minute:'2-digit',hour12:false})}
  function dateKey(at){const d=new Date(at);return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`}
  function dateLabel(at){
    if(dateKey(at)===dateKey(Date.now()))return '今天';
    const yesterday=new Date();yesterday.setDate(yesterday.getDate()-1);
    if(dateKey(at)===dateKey(yesterday.getTime()))return '昨天';
    return new Date(at).toLocaleDateString('zh-TW');
  }
  function formatListTime(at){return dateKey(at)===dateKey(Date.now())?formatTime(at):dateLabel(at)}
  function addDay(at){
    const key=dateKey(at);
    const days=messages.querySelectorAll('.day');
    if(days.length&&days[days.length-1].dataset.date===key)return;
    const day=document.createElement('div');day.className='day';day.dataset.date=key;
    const label=document.createElement('span');label.textContent=dateLabel(at);day.appendChild(label);messages.appendChild(day);
  }
  function chatTime(i){
    if(i===PENGUIN_CHAT)return state.penguin.messages.at(-1)?.at||state.penguin.addedAt;
    if(i===0)return state.extra.at(-1)?.at||state.introAt.at(-1)||state.groupOpenedAt||state.penguin.addedAt;
    return state.historyAt[i];
  }
  function isPinned(i){return state.pins[i]??!!chats[i].pinned}
  function isDeleted(i){return i===PENGUIN_CHAT?state.penguin.deleted:!!state.deletedFriends[i]}
  function openMenu(i){
    if(i===null)return;menuChat=i;
    document.getElementById('menuTitle').textContent=chats[i].name;
    document.getElementById('pinChatBtn').textContent=isPinned(i)?'取消釘選':'釘選';
    document.getElementById('deleteFriendBtn').hidden=!!chats[i].game||!!chats[i].memberAvatars||isDeleted(i);
    const dialog=document.getElementById('chatMenu');if(!dialog.open)dialog.showModal();
  }
  function closeMenu(){document.getElementById('chatMenu').close()}
  function resumeTimers(){
    if(solved()&&!state.thanksShown){if(state.thanksDueAt<=Date.now())showThanks();else queueThanks()}
    queueHarassment();
  }
  function avatarHTML(person,extra='',override=''){const p=people[person]||people.deputy;return `<img class="avatar ${extra}" data-person="${person}" src="${override||p.avatar}" alt="${p.name}的頭貼">`}
  function solved(){return state.finished&&state.target==='ethan'}
  function gamePreview(){if(solved()&&state.thanksShown)return'副手：謝謝你幫我找出叛徒。';if(state.extra.length){const m=state.extra[state.extra.length-1],p=people[m.who]||people.me;return`${p.name}：${m.text}`}if(state.started&&state.revealed){const m=intro[Math.min(state.revealed,intro.length)-1];return`${people[m[0]].name}：${m[1]}`}return chats[0].preview}
  function renderHome(){
    const order=chats.map((_,i)=>i).sort((a,b)=>Number(isPinned(b))-Number(isPinned(a))||chatTime(b)-chatTime(a));
    document.getElementById('chatList').innerHTML=order.map(i=>{
      const c=chats[i],unread=c.penguin?state.penguin.unread:c.badge&&!state.readChats.includes(i);
      return `<button class="chat-row ${isPinned(i)?'pinned':''}" data-chat="${i}">${avatarHTML(c.penguin?'penguin':'deputy',c.group?'group':'',c.avatar)}<span class="row-main"><span class="row-name">${c.name}</span><span class="row-preview"></span></span><span class="row-time">${formatListTime(chatTime(i))}${unread?`<b class="badge">${c.badge||1}</b>`:''}</span></button>`;
    }).join('');
    document.querySelectorAll('[data-chat]').forEach(b=>{
      const i=Number(b.dataset.chat),c=chats[i],last=state.penguin.messages.at(-1);
      b.querySelector('.row-preview').textContent=c.penguin?(state.penguin.deleted?'已刪除好友':last?`你：${last.text}`:PENGUIN_GREETING):i===0?gamePreview():c.preview;
      let timer=null,held=false,x=0,y=0;
      const cancel=()=>{clearTimeout(timer);timer=null};
      b.onpointerdown=e=>{if(e.button!==0)return;held=false;x=e.clientX;y=e.clientY;timer=setTimeout(()=>{held=true;openMenu(i)},550)};
      b.onpointermove=e=>{if(Math.hypot(e.clientX-x,e.clientY-y)>10)cancel()};
      b.onpointerup=cancel;b.onpointercancel=cancel;b.onpointerleave=cancel;
      b.oncontextmenu=e=>{e.preventDefault();cancel();held=true;openMenu(i)};
      b.onclick=e=>{if(held){e.preventDefault();held=false;return}openChat(i)};
      b.onkeydown=e=>{if(e.key==='ContextMenu'||(e.shiftKey&&e.key==='F10')){e.preventDefault();openMenu(i)}};
    });
  }

  function addMessage(who,text,isMe=false,displayName='',avatar='',at=Date.now()){
    addDay(at);
    const p=people[who]||people.me,el=document.createElement('div');el.className='message'+(isMe?' me':'');
    el.innerHTML=`${avatarHTML(who,'',avatar)}<div class="msg-body"><div class="sender">${displayName||p.name}</div><div class="bubble"></div><time class="stamp" datetime="${new Date(at).toISOString()}">${formatTime(at)}</time></div>`;
    el.querySelector('.bubble').textContent=text;messages.appendChild(el);return el;
  }

  function showBloodFinal(){const video=document.getElementById('blood'),still=document.getElementById('bloodStill');video.pause();video.classList.remove('show');still.classList.add('show')}
  function hideBlood(){const video=document.getElementById('blood'),still=document.getElementById('bloodStill');video.pause();video.currentTime=0;video.classList.remove('show');still.classList.remove('show')}
  function playBlood(){const video=document.getElementById('blood'),still=document.getElementById('bloodStill');still.classList.remove('show');video.classList.add('show');video.currentTime=0;video.onended=showBloodFinal;const p=video.play();if(p)p.catch(()=>showBloodFinal())}
  function playGunshot(){const audio=document.getElementById('gunshot');audio.currentTime=0;const p=audio.play();if(p)p.catch(()=>{})}
  function addFinishedNote(){if(document.getElementById('finishedNote'))return;const n=document.createElement('div');n.id='finishedNote';n.className='finished-note';n.textContent='本次調查已結束，所有紀錄均已保存。';messages.appendChild(n)}
  function showThanks(){
    if(state.thanksShown)return;
    const thanks={who:'deputy',text:'謝謝你幫我找出叛徒。',at:state.thanksDueAt};
    state.extra.push(thanks);state.thanksShown=true;
    if(activeChat===0){addMessage(thanks.who,thanks.text,false,'','',thanks.at);addFinishedNote();scrollBottom()}
    save();if(home.classList.contains('active'))renderHome();
  }

  function queueThanks(){clearTimeout(thanksTimer);if(state.thanksShown)return;if(!state.thanksDueAt){state.thanksDueAt=Date.now()+THANK_YOU_DELAY_SECONDS*1000;save()}thanksTimer=setTimeout(showThanks,Math.max(0,state.thanksDueAt-Date.now()))}
  function scrollBottom(){requestAnimationFrame(()=>messages.scrollTop=messages.scrollHeight)}
  function revealNext(){
    if(state.revealed>=intro.length||state.finished)return;
    const at=Date.now(),m=intro[state.revealed];state.introAt[state.revealed]=at;
    addMessage(m[0],m[1],false,'','',at);state.revealed++;save();syncComposer();scrollBottom();
    if(state.revealed<intro.length)introTimer=setTimeout(revealNext,650);
  }

  function renderChat(){clearTimeout(introTimer);messages.innerHTML='';addMessage(opening[0],opening[1],false,'','',state.groupOpenedAt);intro.slice(0,state.revealed).forEach((m,i)=>addMessage(m[0],m[1],false,'','',state.introAt[i]));state.extra.forEach(m=>addMessage(m.who,m.text,m.me,'','',m.at));if(state.stage==='question'&&!state.finished)renderOptions();if(solved()){if(state.bloodPlayed)showBloodFinal();else{playBlood();playGunshot();state.bloodPlayed=true;save()}redAvatar();queueThanks()}else hideBlood();if(state.finished&&(!solved()||state.thanksShown))addFinishedNote();syncComposer();scrollBottom();if(state.revealed<intro.length&&!state.finished)introTimer=setTimeout(revealNext,650)}
  function renderOrdinary(c){
    messages.innerHTML='';c.msgs.forEach((m,i)=>{const isMe=m[0]==='你',memberAvatar=c.memberAvatars?.[m[0]]||c.avatar;addMessage(isMe?'me':'deputy',m[1],isMe,m[0],isMe?'':memberAvatar,state.historyAt[activeChat]-(c.msgs.length-1-i)*60000)});
    hideBlood();const input=document.getElementById('answerInput'),btn=document.getElementById('sendBtn');input.disabled=true;btn.disabled=true;input.placeholder='此對話僅供查看';scrollBottom();
  }

  function openChat(index,push=true){
    closeMenu();clearTimeout(introTimer);activeChat=index;const c=chats[index];
    if(!state.readChats.includes(index))state.readChats.push(index);
    document.getElementById('chatTitle').textContent=c.name;chat.setAttribute('aria-label',c.name);
    document.getElementById('answerInput').value='';home.classList.remove('active');chat.classList.add('active');
    if(c.game){state.started=true;state.groupOpenedAt=state.groupOpenedAt||Date.now();renderChat()}
    else if(c.penguin){state.penguin.unread=false;renderPenguin()}
    else renderOrdinary(c);
    save();if(push)history.pushState({chat:index},'',`#chat-${index}`);
  }

  function goHome(){closeMenu();clearTimeout(introTimer);activeChat=null;hideBlood();chat.classList.remove('active');home.classList.add('active');renderHome();history.replaceState({},'','#')}
  function renderPenguin(){
    hideBlood();messages.innerHTML='';addDay(state.penguin.addedAt);
    const note=document.createElement('div');note.className='friend-note';note.textContent='你已依照企鵝人的指示，將他加入好友。';messages.appendChild(note);
    addMessage('penguin',PENGUIN_GREETING,false,'','',state.penguin.addedAt);
    const invitation=addMessage('penguin','',false,'','',state.penguin.addedAt);invitation.classList.add('invitation');
    invitation.querySelector('.bubble').innerHTML='<img class="avatar group-card-avatar" src="assets/BLACK.webp" alt="抓叛徒群組的頭貼"><strong class="group-card-name">抓叛徒群組 (9)</strong><a class="group-invite" href="#chat-0">查看群組</a>';
    invitation.querySelector('.group-invite').onclick=e=>{e.preventDefault();openChat(0)};
    state.penguin.messages.forEach(m=>addMessage('me',m.text,true,'','',m.at));
    if(state.penguin.deleted){const note=document.createElement('div');note.className='friend-note';note.textContent='已刪除好友，手機不會再傳送訊息給企鵝人。';messages.appendChild(note)}
    document.getElementById('answerInput').disabled=true;document.getElementById('sendBtn').disabled=true;
    document.getElementById('answerInput').placeholder=state.penguin.deleted?'已刪除好友':'你已加入好友';scrollBottom();
  }

  function queueHarassment(){
    clearTimeout(harassTimer);
    if(!state.finished||state.penguin.deleted)return;
    if(state.penguin.nextAt<=Date.now())sendHarassment();
    harassTimer=setTimeout(queueHarassment,Math.max(0,state.penguin.nextAt-Date.now()));
  }

  function harassmentPool(){
    return ['老大老大你好棒！','老大！讀我訊息！',solved()?'老大我抓到叛徒了！！！':'老大我沒有抓到叛徒ＱＱＱＱ','老大！你好帥！！！我崇拜你！','企鵝人就是第一名反派！',...EXTRA_HARASS_MESSAGES];
  }
  function sendHarassment(){
    const p=state.penguin;if(!state.finished||p.deleted)return;
    const now=Date.now();
    // Preserve the scheduled times when catching up after the page was closed.
    while(p.nextAt<=now){
      // Persist the unused messages so a reload never restarts a round.
      if(!p.remainingMessages?.length)p.remainingMessages=harassmentPool();
      const index=Math.floor(Math.random()*p.remainingMessages.length);
      const [text]=p.remainingMessages.splice(index,1);
      p.messages.push({me:true,text,at:p.nextAt});
      p.sentCount++;p.nextAt+=HARASS_INTERVAL;
    }
    save();if(activeChat===PENGUIN_CHAT)renderPenguin();if(home.classList.contains('active'))renderHome();
  }

  function deleteFriend(){
    const index=menuChat;if(index===null||isDeleted(index))return;
    if(!window.confirm(`要刪除「${chats[index].name}」的好友嗎？聊天紀錄會保留。`))return;
    if(index===PENGUIN_CHAT){queueHarassment();state.penguin.deleted=true;state.penguin.unread=false;state.penguin.nextAt=null;clearTimeout(harassTimer)}
    state.deletedFriends[index]=true;save();closeMenu();
    if(activeChat===PENGUIN_CHAT)renderPenguin();if(home.classList.contains('active'))renderHome();
  }

  function submitAnswer(e){e.preventDefault();if(activeChat!==0)return;if(state.stage!=='answer'||state.finished||state.revealed<intro.length)return;const input=document.getElementById('answerInput');const raw=input.value.trim();if(!raw)return;const names={john:'約翰',arthur:'亞瑟',merlin:'梅林',gawain:'高文',percival:'帕西瓦爾',ethan:'伊森',diana:'黛安娜'};const matched=Object.keys(names).filter(k=>raw.includes(names[k]));const mine={at:Date.now(),who:'me',text:raw,me:true};state.extra.push(mine);addMessage(mine.who,mine.text,!!mine.me,'','',mine.at);input.value='';if(matched.length===0){const reply={at:Date.now(),who:'deputy',text:'你在說什麼？重答一次。'};state.extra.push(reply);addMessage(reply.who,reply.text,!!reply.me,'','',reply.at);save();scrollBottom();return}if(matched.length>1){const reply={at:Date.now(),who:'deputy',text:'叛徒只有一個，請重答。'};state.extra.push(reply);addMessage(reply.who,reply.text,!!reply.me,'','',reply.at);save();scrollBottom();return}state.target=matched[0];state.stage='question';const reply={at:Date.now(),who:'deputy',text:'你現在可以問他一個問題了。'};state.extra.push(reply);addMessage(reply.who,reply.text,!!reply.me,'','',reply.at);renderOptions();save();syncComposer();scrollBottom()}
  function renderOptions(){const wrap=document.createElement('div');wrap.className='question-options';['１１１','２２２','３３３','４４４'].forEach((label,i)=>{const b=document.createElement('button');b.className='option';b.textContent=label;b.onclick=()=>chooseQuestion(i);wrap.appendChild(b)});messages.appendChild(wrap)}
  function chooseQuestion(i){if(state.stage!=='question'||state.finished)return;const labels=['１１１','２２２','３３３','４４４'],answers=['１２３','456','789','1112'];document.querySelector('.question-options')?.remove();state.choice=i;const mine={at:Date.now(),who:'me',text:labels[i],me:true};state.extra.push(mine);addMessage(mine.who,mine.text,!!mine.me,'','',mine.at);const isTraitor=state.target==='ethan';if(isTraitor){const answer={at:Date.now(),who:'ethan',text:answers[i]};state.extra.push(answer);addMessage(answer.who,answer.text,!!answer.me,'','',answer.at);state.finished=true;state.stage='finished';state.thanksShown=false;state.thanksDueAt=Date.now()+THANK_YOU_DELAY_SECONDS*1000;playBlood();playGunshot();state.bloodPlayed=true;redAvatar();queueThanks()}else{const refusal={at:Date.now(),who:state.target,text:'我為什麼要告訴你？'};state.extra.push(refusal);addMessage(refusal.who,refusal.text,!!refusal.me,'','',refusal.at);state.finished=true;state.stage='finished';addFinishedNote()}state.finishedAt=state.extra.at(-1).at;if(!state.penguin.deleted)state.penguin.nextAt=(isTraitor?state.thanksDueAt:state.finishedAt)+HARASS_DELAY;save();queueHarassment();syncComposer();scrollBottom()}
  function redAvatar(){document.querySelectorAll('[data-person="ethan"]').forEach(a=>a.classList.add('red'))}
  function syncComposer(){const input=document.getElementById('answerInput'),btn=document.getElementById('sendBtn');const introducing=state.revealed<intro.length;const disabled=state.stage!=='answer'||state.finished||introducing;input.disabled=disabled;btn.disabled=disabled;input.placeholder=introducing?'請稍候……':'輸入叛徒的名字';if(state.stage==='question')input.placeholder='請選擇上方的一個問題';if(state.finished)input.placeholder='本次遊戲已結束'}
  document.getElementById('answerForm').addEventListener('submit',submitAnswer);document.getElementById('backBtn').onclick=goHome;
  document.getElementById('deleteFriendBtn').onclick=deleteFriend;
  document.getElementById('chatMenuBtn').onclick=()=>openMenu(activeChat);
  document.getElementById('muteChatBtn').onclick=closeMenu;
  document.getElementById('pinChatBtn').onclick=()=>{state.pins[menuChat]=!isPinned(menuChat);save();closeMenu();if(home.classList.contains('active'))renderHome()};
  document.getElementById('chatMenu').addEventListener('click',e=>{if(e.target===e.currentTarget){const r=e.currentTarget.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeMenu()}});
  window.addEventListener('popstate',()=>{const i=Number(location.hash.slice(6));if(location.hash.startsWith('#chat-')&&chats[i])openChat(i,false);else goHome()});
  document.addEventListener('error',e=>{if(e.target instanceof HTMLImageElement&&e.target.dataset.person==='penguin'){e.target.hidden=true;const fallback=document.createElement('span');fallback.className='avatar penguin-fallback';fallback.textContent='♛';fallback.setAttribute('role','img');fallback.setAttribute('aria-label','偉大的高譚之王的暫用頭貼');e.target.replaceWith(fallback)}},true);
  function updateClock(){const now=new Date().toLocaleTimeString('zh-TW',{hour:'2-digit',minute:'2-digit',hour12:false});document.querySelectorAll('.clock').forEach(el=>el.textContent=now)}updateClock();setInterval(updateClock,1000);document.addEventListener('visibilitychange',updateClock);renderHome();
  if(!state.penguin.introduced){state.penguin.introduced=true;openChat(PENGUIN_CHAT,false);history.replaceState({chat:PENGUIN_CHAT},'',`#chat-${PENGUIN_CHAT}`)}
  else if(location.hash.startsWith('#chat-')){const i=Number(location.hash.slice(6));if(chats[i])openChat(i,false)}
  save();resumeTimers();
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)resumeTimers()});
  window.addEventListener('pageshow',resumeTimers);
})();
