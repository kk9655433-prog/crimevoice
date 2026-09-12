
const modal=document.getElementById('modal');
const modalBody=document.getElementById('modalBody');

/* ===== 系統登入帳號 ===== */
const systemAccounts = {
  's.essen': 'essen-HT214',
  'a.hugo': 'hugo-SP779',
  'vip-guest': 'VIP-Blackgate88'
};

const systemProfiles = {
  's.essen': '獄警 莎拉．艾森',
  'a.hugo': '醫生 阿黛爾．雨果',
  'vip-guest': '訪客 未知'
};

const loginLock = document.getElementById('loginLock');
const loginForm = document.getElementById('loginForm');
const loginAccount = document.getElementById('loginAccount');
const loginPassword = document.getElementById('loginPassword');
const loginError = document.getElementById('loginError');
const welcomeText = document.getElementById('welcomeText');
const logoutButton = document.getElementById('logoutButton');
const logoutDialog = document.getElementById('logoutDialog');
const confirmLogout = document.getElementById('confirmLogout');
const cancelLogout = document.getElementById('cancelLogout');

loginForm.addEventListener('submit', event => {
  event.preventDefault();

  const account = loginAccount.value.trim().toLowerCase();
  const password = loginPassword.value;

  if(systemAccounts[account] === password){
    loginError.textContent = '';
    welcomeText.textContent = `歡迎你，${systemProfiles[account]}`;
    loginLock.classList.add('unlocked');
    setTimeout(() => loginLock.remove(), 500);
    return;
  }

  loginError.textContent = '帳號或密碼錯誤，請重新輸入。';
  loginPassword.value = '';
  loginPassword.focus();
});

logoutButton.addEventListener('click', () => {
  logoutDialog.classList.add('active');
  logoutDialog.setAttribute('aria-hidden','false');
});

cancelLogout.addEventListener('click', () => {
  logoutDialog.classList.remove('active');
  logoutDialog.setAttribute('aria-hidden','true');
});

confirmLogout.addEventListener('click', () => {
  window.location.reload();
});

logoutDialog.addEventListener('click', event => {
  if(event.target === logoutDialog){
    cancelLogout.click();
  }
});

function openModal(html){
  modalBody.innerHTML = `
    <div class="close-btn" onclick="closeModal()">✕</div>
    ${html}
  `;
  modal.classList.add('active');
}
function closeModal(){
  modal.classList.remove('active');
  modalBody.innerHTML='';
}

/* ===== 文件 ===== */

const fileMap={
"GHMA-114-DRAFT":"doc114",
"GHMA-833-STASH":"doc833"
};

const documents={

doc114:`
<div class="document-bg"><div class="document">
<div class="doc-header">
<h2>--------------</h2>
<div class="meta-box">
法案名稱：-------<br>
提案單位：-------<br>
提案人：-------<br>
檔案編號：-------
</div></div>

你以為這是第一屆嗎？
這甚至是七年後的法案耶`,

doc833:`
<div class="document-bg"><div class="document">
<div class="doc-header">
<h2>--------------</h2>
<div class="meta-box">
保密等級：-------<br>
保存期限：-------<br>
流通限制：-------<br>
會議時間：-------<br>
會議地點：-------<br>
與會人員：-------<br>
檔案編號：-------
</div></div>

你以為這是第一屆嗎？
這甚至是七年後的會議耶
`
};

/* ===== 黑框轉換：只處理 ＂...＂；每段各自一條海苔；點一下整段解鎖 ===== */
function renderDocument(html){

  html = html.replace(/＂([\s\S]*?)＂/g, (m, content) => {
    const normalized = normalizeSpoilerContent(content);
    return `<span class="redacted-group">${normalized}</span>`;
  });

  openModal(html);

  document.querySelectorAll('.redacted-group').forEach(group=>{
    group.onclick = (e)=>{ e.stopPropagation(); startAuth(group); };
  });
}

/* 將內容中的 <p> 與 <br><br> 視為「段落分隔」；
   每個段落各自包一個 .redacted-spoiler，分隔用 <br><br> 放在 span 外面
   => 段落間不會出現小黑塊 */
function normalizeSpoilerContent(raw){
  const tpl = document.createElement('template');
  tpl.innerHTML = raw;

  // 1) <p> 攤平：內容 + "\n\n"
  const ps = [...tpl.content.querySelectorAll('p')];
  ps.forEach(p=>{
    const frag = document.createDocumentFragment();
    while(p.firstChild) frag.appendChild(p.firstChild);
    frag.appendChild(document.createTextNode('\n\n'));
    p.replaceWith(frag);
  });

  // 2) <br> 轉成換行字元
  let htmlStr = tpl.innerHTML
    .replace(/<br\s*\/?>\s*<br\s*\/?>/gi, '\n\n')
    .replace(/<br\s*\/?>/gi, '\n');

  // 3) 壓縮多餘空白：3 個以上換行 => 2 個換行
  htmlStr = htmlStr.replace(/\n{3,}/g, '\n\n').trim();

  // 4) 以空行分段（段落切割）
  let parts = htmlStr
    .split(/\n\s*\n/g)
    .map(s => s.trim())
    .filter(Boolean);
  if (parts.length >= 2) {
    parts = [ (parts[0] + '\n' + parts[1]).trim(), ...parts.slice(2) ];
  }

  // 5) 每段包成一條海苔；段內單換行 => <br>；段與段之間 => <br><br>
  return parts
    .map(part => `<span class="redacted-spoiler">${part.replace(/\n+/g, '<br>')}</span>`)
    .join('<br><br>');
}
/* ===== 權限流程 ===== */
function startAuth(group){

  if(group.classList.contains('revealed')) return;

  const auth=document.createElement('div');
  auth.className="auth-box";
  document.body.appendChild(auth);

  let dots=0;
  const dotInterval=setInterval(()=>{
    dots=(dots+1)%4;
    auth.innerHTML="確認權限中"+ ".".repeat(dots);
  },500);

  setTimeout(()=>{
    auth.innerHTML="確認完成<br>權限已解鎖...";
    clearInterval(dotInterval);
  },3000);

  setTimeout(()=>{
    auth.remove();
    group.classList.add('revealed');
  },5000);
}
/* ===== 密碼輸入 ===== */
function querySystemGate(){

  openModal(`
  <p style="text-align:center">本監獄系統已整合高譚各監獄系統</p>
  <p style="text-align:center">請輸入檔案編號</p>
  <div style="display:flex;justify-content:center;gap:4px;">
  ${'<input class="pwd start" maxlength="1">'.repeat(4)}
  <span>-</span>
  ${'<input class="pwd mid" maxlength="1">'.repeat(3)}
  <span>-</span>
  ${'<input class="pwd end" maxlength="1">'.repeat(5)}
  </div>
  <button id="pwdConfirm">確定</button>
  `);

  const inputs=[...document.querySelectorAll('.pwd')];

  function submitPassword(){
    const starts=[...document.querySelectorAll('.start')].map(i=>i.value).join('');
    const mids=[...document.querySelectorAll('.mid')].map(i=>i.value).join('');
    const ends=[...document.querySelectorAll('.end')].map(i=>i.value).join('');
    const val=`${starts}-${mids}-${ends}`;

    if(fileMap[val]){
      renderDocument(documents[fileMap[val]]);
    }else{
      alert("查無此檔案");
    }
  }

  inputs.forEach((input,idx)=>{

    input.addEventListener('input', ()=>{
      if(input.classList.contains('mid')){
        input.value = input.value.replace(/\D/g,'');
      } else {
        input.value = input.value.toUpperCase().replace(/[^A-Z]/g,'');
      }
      if(input.value && inputs[idx+1]) inputs[idx+1].focus();
    });

    input.addEventListener('keydown', e=>{
      if(e.key==='Enter'){
        submitPassword();
      }

      if(e.key==='Backspace'){
        if(input.value === '' && idx>0){
          inputs[idx-1].focus();
          inputs[idx-1].value = '';
        }
      }

      if(e.key==='ArrowLeft' && idx>0){
        inputs[idx-1].focus();
      }

      if(e.key==='ArrowRight' && idx<inputs.length-1){
        inputs[idx+1].focus();
      }
    });

  });

  document.getElementById('pwdConfirm').onclick = submitPassword;

}
  modal.addEventListener('click', e=>{
  if(e.target === modal){
    closeModal();
  }
});
/* 禁止右鍵選單 */
document.addEventListener('contextmenu', event => {
  event.preventDefault();
});

/* 禁止拖曳圖片或其他元素 */
document.addEventListener('dragstart', event => {
  event.preventDefault();
});

/* 禁止反白與複製 */
document.addEventListener('selectstart', event => {
  event.preventDefault();
});

document.addEventListener('copy', event => {
  event.preventDefault();
});

/* 阻擋常見的查看原始碼、儲存和開發工具快捷鍵 */
document.addEventListener('keydown', event => {
  const key = event.key.toLowerCase();

  const blocked =
    event.key === 'F12' ||
    (event.ctrlKey && key === 'u') ||                    // 查看原始碼
    (event.ctrlKey && key === 's') ||                    // 儲存網頁
    (event.ctrlKey && key === 'p') ||                    // 列印
    (event.ctrlKey && event.shiftKey && key === 'i') || // 開發者工具
    (event.ctrlKey && event.shiftKey && key === 'j') || // 控制台
    (event.ctrlKey && event.shiftKey && key === 'c');   // 元素檢查

  if (blocked) {
    event.preventDefault();
    event.stopPropagation();
    return false;
  }
});
