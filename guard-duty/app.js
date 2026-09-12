(() => {
  'use strict';
  const KEY = 'guard_duty_16_v1';
  const MESSAGE_DELAY = 850;
  const people = {
    captain: { name: '獄警隊長', avatar: 'assets/captain.webp' },
    Joseph: { name: '約瑟夫', avatar: 'assets/Joseph.webp' },
    Anne: { name: '安妮', avatar: 'assets/Anne.webp' },
    Thor: { name: '托爾', avatar: 'assets/Thor.webp' },
    James: { name: '詹姆斯', avatar: 'assets/James.webp' },
    David: { name: '大衛', avatar: 'assets/David.webp' },
    me: { name: '你', avatar: 'assets/me.webp' }
  };
  const intro = [
    ['captain', '16號晚上，監獄出了狀況，當天的值班表卻不見了。我把可能值班的五名獄警找來，得到以下證詞。'],
    ['captain', '已經確定，當天只有一人負責值班，而且只有他在說謊，其餘四人說的都是真話。'],
    ['Joseph', '16號既不是安妮值班，也不是大衛值班。'],
    ['Anne', '約瑟夫和托爾的證詞，要嘛都是真的，要嘛都是假的。'],
    ['Thor', '16號值班的人，是詹姆斯或伊森其中一個。'],
    ['James', '那天是約瑟夫或托爾值班。'],
    ['David', '安妮和詹姆斯之中，只有一個人說真話。'],
    ['captain', '請幫我查出，誰負責16號的值班？\n直接回覆他的名字。']
  ];
  const $ = id => document.getElementById(id);
  const messages = $('messages'), input = $('answerInput');
  let timer;
  const fresh = () => ({ version: 1, revealed: 0, extra: [], finished: false });
  function load() {
    try {
      const x = JSON.parse(localStorage.getItem(KEY));
      if (x && x.version === 1 && Number.isInteger(x.revealed) && x.revealed >= 0 && x.revealed <= intro.length && Array.isArray(x.extra) && x.extra.every(m => people[m.who] && typeof m.text === 'string' && typeof m.time === 'string') && typeof x.finished === 'boolean') return x;
    } catch (_) {}
    return fresh();
  }
  let state = load();
  function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (_) {} }
  function now() { return new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit', hour12: false }); }
  function bottom() { requestAnimationFrame(() => { messages.scrollTop = messages.scrollHeight; }); }
  function addMessage(who, text, time = '22:14') {
    const row = document.createElement('div'); row.className = 'message' + (who === 'me' ? ' me' : '');
    const avatar = document.createElement('img'); avatar.className = 'avatar'; avatar.src = people[who].avatar; avatar.alt = people[who].name + '的頭貼';
    const body = document.createElement('div'); body.className = 'msg-body';
    const name = document.createElement('div'); name.className = 'sender'; name.textContent = people[who].name;
    const bubble = document.createElement('div'); bubble.className = 'bubble'; bubble.textContent = text;
    const stamp = document.createElement('div'); stamp.className = 'stamp'; stamp.textContent = (who === 'me' ? '已讀 6　' : '') + time;
    body.append(name, bubble, stamp); row.append(avatar, body); messages.append(row);
  }
  function extra(who, text) { const m = { who, text, time: now() }; state.extra.push(m); addMessage(who, text, m.time); }
  function sync() {
    input.disabled = state.finished || state.revealed < intro.length;
    $('sendBtn').disabled = input.disabled || !input.value.trim();
    input.placeholder = state.finished ? '本次調查已結束' : state.revealed < intro.length ? '請稍候……' : '輸入值班者的名字';
  }
  function finishedNote() { const el = document.createElement('div'); el.className = 'finished-note'; el.textContent = '本次調查已結束。'; messages.append(el); }
  function reveal() {
    if (state.revealed >= intro.length) return;
    const nearBottom = messages.scrollHeight - messages.scrollTop - messages.clientHeight < 100;
    const m = intro[state.revealed++]; addMessage(...m); save(); sync();
    if (nearBottom) bottom();
    if (state.revealed < intro.length) timer = setTimeout(reveal, MESSAGE_DELAY);
  }
  function render() {
    clearTimeout(timer); messages.replaceChildren();
    const day = document.createElement('div'); day.className = 'day'; const label = document.createElement('span'); label.textContent = '今天'; day.append(label); messages.append(day);
    intro.slice(0, state.revealed).forEach(m => addMessage(...m));
    state.extra.forEach(m => addMessage(m.who, m.text, m.time));
    if (state.finished) finishedNote();
    sync(); bottom();
    if (state.revealed < intro.length) timer = setTimeout(reveal, state.revealed ? MESSAGE_DELAY : 100);
  }
  function submit(raw) {
    if (typeof raw !== 'string' || !raw.trim() || raw.length > 50 || state.finished || state.revealed < intro.length) return { accepted: false };
    raw = raw.trim(); extra('me', raw); input.value = '';
    const cleaned = raw.replace(/[\s，。！？!?,.：:]/g, '');
    const matched = ['Joseph', 'Anne', 'Thor', 'James', 'David'].filter(id => cleaned.includes(people[id].name));
    const named = matched.length === 1 ? matched[0] : null;
    const negated = named && (new RegExp('(?:不是|不會是|不可能是|並非|并非|非|排除|不選|不选)' + people[named].name).test(cleaned) || new RegExp(people[named].name + '(?:不是|沒有|没有|不值班|沒值班|没值班)').test(cleaned));
    const suspect = negated ? null : named;
    if (matched.length > 1) extra('captain', '值班者只有一位，請重新回答一次好嗎?');
    else if (!suspect) extra('captain', '你在說什麼?請重新回答一次好嗎?');
    else if (suspect !== 'James') extra('captain', '這個答案不符合證詞。只有值班的人說謊，其餘四人都說真話，再核對一次。');
    else {
      extra('captain', '確認了，16號是詹姆斯負責值班。他說那天是約瑟夫或托爾值班，這句是謊話；其他四人的證詞都成立。');
      extra('captain', '詹姆斯，到辦公室向我說明當晚的情況。\n謝謝你幫我查出值班的人。');
      state.finished = true; finishedNote();
    }
    save(); sync(); bottom(); return { accepted: true, finished: state.finished };
  }
  $('answerForm').addEventListener('submit', event => { event.preventDefault(); if (!event.isComposing) submit(input.value); });
  input.addEventListener('keydown', event => { if (event.key === 'Enter' && event.isComposing) event.preventDefault(); });
  input.addEventListener('input', sync);
  for (const p of Object.values(people)) {
    const row = document.createElement('div'); row.className = 'member'; const img = document.createElement('img'); img.className = 'avatar'; img.src = p.avatar; img.alt = ''; const name = document.createElement('span'); name.textContent = p.name; row.append(img, name); $('memberList').append(row);
  }
  $('membersBtn').onclick = () => { $('resetPrompt').hidden = true; $('membersDialog').showModal(); };
  $('closeMembers').onclick = () => $('membersDialog').close();
  $('restartBtn').onclick = () => { $('resetPrompt').hidden = false; };
  $('cancelReset').onclick = () => { $('resetPrompt').hidden = true; };
  $('confirmReset').onclick = () => { state = fresh(); input.value = ''; save(); $('membersDialog').close(); render(); };
  function clock() { $('clock').textContent = now(); } clock(); setInterval(clock, 30000);
  // 手機鍵盤開啟時保持輸入框位於可見區域。
  function viewport() { document.documentElement.style.setProperty('--app-height', (window.visualViewport?.height || window.innerHeight) + 'px'); }
  window.visualViewport?.addEventListener('resize', viewport); window.addEventListener('resize', viewport); viewport();
  const context = document.modelContext;
  if (context?.registerTool) {
    try { Promise.resolve(context.registerTool({ name: 'submit_duty_answer', description: '在群組回覆一位值班者的姓名。', inputSchema: { type: 'object', properties: { name: { type: 'string' } }, required: ['name'], additionalProperties: false }, annotations: { readOnlyHint: false }, execute: args => submit(args?.name) })).catch(() => {}); } catch (_) {}
  }
  render();
})();
