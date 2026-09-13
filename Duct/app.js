"use strict";

// ===== 可自行修改：車站素材、八組票號及結局 =====
const CONFIG = {
  stationImage: 'img/station.webp',
  stationAudio: 'img/station.mp3',
  whiteHoldMs: 1800,
  stationFadeMs: 2600,
  endings: [
    { id:'ending-01', ticket:'GT-731204', title:'離開高譚', text:'{{名}}抬頭看了看天空，現在是下午。\n他握緊手中的車票，走向月台。', image:'img/ending-01.jpg' },
    { id:'ending-02', ticket:'GT-286519', title:'結局二', text:'（結局文字待填入）', image:'img/ending-02.jpg' },
    { id:'ending-03', ticket:'GT-940673', title:'結局三', text:'（結局文字待填入）', image:'img/ending-03.jpg' },
    { id:'ending-04', ticket:'GT-158462', title:'結局四', text:'（結局文字待填入）', image:'img/ending-04.jpg' },
    { id:'ending-05', ticket:'GT-602837', title:'結局五', text:'（結局文字待填入）', image:'img/ending-05.jpg' },
    { id:'ending-06', ticket:'GT-479125', title:'結局六', text:'（結局文字待填入）', image:'img/ending-06.jpg' },
    { id:'ending-07', ticket:'GT-823096', title:'結局七', text:'（結局文字待填入）', image:'img/ending-07.jpg' },
    { id:'ending-08', ticket:'GT-365748', title:'結局八', text:'（結局文字待填入）', image:'img/ending-08.jpg' }
  ]
};

const SAVE_KEY = 'gotham-vent-progress-v1';
function loadProgress() {
  try {
    const raw = JSON.parse(localStorage.getItem(SAVE_KEY) || 'null');
    if(raw?.version===1 && Number.isInteger(raw.completed) && raw.completed>=0 && raw.completed<=3) {
            const surname =
        typeof raw.surname === 'string' ? raw.surname.trim() : '';

      const givenName =
        typeof raw.givenName === 'string' ? raw.givenName.trim() : '';

      return {
        version: 1,
        completed: raw.completed,
        startedAt: Number.isFinite(raw.startedAt) && raw.startedAt > 0 ? raw.startedAt : null,
        finishedAt: raw.completed === 3 && Number.isFinite(raw.startedAt) && raw.startedAt > 0 && Number.isFinite(raw.finishedAt) && raw.finishedAt >= raw.startedAt ? raw.finishedAt : null,
        surname,
        givenName,
        endingId:
          raw.completed === 3 &&
          surname &&
          givenName &&
          CONFIG.endings.some(e => e.id === raw.endingId)
            ? raw.endingId
            : null
      };
    }
  } catch(error) { /* Corrupted or unavailable storage starts safely at stage one. */ }
  return {version:1,completed:0,endingId:null};
}
let progress = loadProgress();
function save(completed = progress.completed, endingId = progress.endingId) {
    progress = {
    version: 1,
    completed: Math.max(
      progress.completed,
      Math.max(0, Math.min(3, completed))
    ),
    endingId,
    surname: progress.surname || '',
    givenName: progress.givenName || '',
    startedAt: progress.startedAt || null,
    finishedAt: progress.finishedAt || null
  };
  try {
    localStorage.setItem(SAVE_KEY,JSON.stringify(progress));
    document.getElementById('saveStatus').textContent='';
    return true;
  } catch(error) {
    document.getElementById('saveStatus').textContent='瀏覽器未能保存進度，請保持此頁開啟。';
    return false;
  }
}

// Wall-clock timing survives refreshes and stops before the station transition.
function startEscapeTimer() {
  // An older save already past stage one has no recoverable original start time.
  if(progress.completed===0&&!progress.startedAt){
    progress.startedAt=Date.now();progress.finishedAt=null;save();
  }
}
function finishEscapeTimer() {
  if(progress.startedAt&&!progress.finishedAt){
    progress.finishedAt=Math.max(progress.startedAt,Date.now());
  }
}
function showEscapeTime() {
  if(!progress.startedAt||!progress.finishedAt){
    ask(' ','這份存檔沒有完整的逃出時間紀錄。計時功能更新前的遊戲無法補算。',null,false);
    return;
  }
  const seconds=Math.floor((progress.finishedAt-progress.startedAt)/1000);
  const minutes=Math.floor(seconds/60),remainder=seconds%60;
  ask(' ',`恭喜你，在這場逃獄行動中！
您獲得了${minutes}分${remainder}秒的好成績！
快來跟小夥伴比較看看誰比較快吧！`,null,false);
}

// Same-page stage controller. No framework or server is required.
let currentStage = 0;
const initialized = new Set();
const stageHints = ['輕觸管件旋轉，連通所有通風管。','從端點拖向同色端點；重新拖曳可重畫該線。','先查看收集盒需要的顏色，再拆螺絲。'];
function goToStage(number) {
  if (number < 1 || number > 3) return;
  currentStage = number;
  document.querySelectorAll('.stage').forEach((stage, index) => {stage.hidden = index !== number - 1;});
  document.getElementById('stageCount').textContent = `0${number} / 03`;
  document.getElementById('stageHint').textContent = stageHints[number - 1];
  document.querySelectorAll('.stage-progress i').forEach((item,index) => {
    item.className = index < number-1 ? 'done' : index === number-1 ? 'current' : '';
  });
  if(!initialized.has(number)) {
    initialized.add(number);
    [initStage1,initStage2,initStage3][number-1]();
  }
  window.scrollTo(0,0);
  document.querySelector(`#s${number}-introModal button`)?.focus({preventScroll:true});
}
function ask(title, message, action, cancellable=true) {
  const dialog=document.getElementById('notice');
  document.getElementById('noticeTitle').textContent=title;
  document.getElementById('noticeText').textContent=message;
  document.getElementById('noticeCancel').hidden=!cancellable;
  document.getElementById('noticeCancel').onclick=()=>dialog.close();
  document.getElementById('noticeOK').onclick=()=>{dialog.close();action?.();};
  dialog.showModal();
}
document.getElementById('helpBtn').addEventListener('click',()=>{
  document.getElementById(`s${currentStage}-introModal`).classList.remove('hidden');
});

function initStage1() {
  const COLS = 6;
  const ROWS = 8;
  const TARGET_INTERNAL_DEAD_ENDS = 10;

  const canvas = document.getElementById("s1-game");
  const ctx = canvas.getContext("2d");
  const introModal = document.getElementById("s1-introModal");
  const successModal = document.getElementById("s1-successModal");
  const confirmBtn = document.getElementById("s1-confirmBtn");
  const nextStepBtn = document.getElementById("s1-nextStepBtn");

  const DIRS = [
    { x: 0, y: -1, bit: 1 },
    { x: 1, y: 0, bit: 2 },
    { x: 0, y: 1, bit: 4 },
    { x: -1, y: 0, bit: 8 }
  ];

  const START = { x: 0, y: 2, outsideBit: 8, side: "left" };
  const END   = { x: COLS - 1, y: 5, outsideBit: 2, side: "right" };

  const IMAGE_PATHS = {
    straight: "img/straight.png",
    corner: "img/corner.png",
    tee: "img/tee.png",
    cross: "img/cross.png",
    end: "img/end.png",
    connector_left: "img/connector_left.png",
    connector_right: "img/connector_right.png"
  };

  const IMAGES = {};
  let solution = [];
  let grid = [];
  let solvedState = false;
  let redirecting = false;
  let imagesReady = false;

  function getBoardMetrics() {
    const rect = canvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    const isMobile = window.innerWidth <= 560;

    const topArea = isMobile ? 42 : 46;
    const sidePad = 20;
    const bottomPad = isMobile ? 14 : 18;

    const cellSize = Math.min(
      (w - sidePad * 2) / COLS,
      (h - topArea - bottomPad) / ROWS
    );

    const boardW = cellSize * COLS;
    const boardH = cellSize * ROWS;
    const boardX = (w - boardW) / 2;
    const boardY = topArea;

    return { w, h, topArea, sidePad, bottomPad, cellSize, boardW, boardH, boardX, boardY };
  }

  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(rect.width * dpr);
    canvas.height = Math.floor(rect.height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    draw();
  }

  function loadImages() {
    const entries = Object.entries(IMAGE_PATHS);
    return Promise.all(entries.map(([key, src]) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          IMAGES[key] = img;
          resolve();
        };
        img.onerror = () => {
          resolve();
        };
        img.src = src;
      });
    }));
  }

  function rand(n) {
    return Math.floor(Math.random() * n);
  }

  function rotateMaskLeft(mask) {
    return ((mask << 1) & 15) | ((mask >> 3) & 1);
  }

  function degree(mask) {
    return ((mask & 1) ? 1 : 0)
      + ((mask & 2) ? 1 : 0)
      + ((mask & 4) ? 1 : 0)
      + ((mask & 8) ? 1 : 0);
  }

  function inBounds(x, y) {
    return x >= 0 && y >= 0 && x < COLS && y < ROWS;
  }

  function oppositeBit(bit) {
    if (bit === 1) return 4;
    if (bit === 2) return 8;
    if (bit === 4) return 1;
    return 2;
  }

  function isStart(x, y) {
    return x === START.x && y === START.y;
  }

  function isEnd(x, y) {
    return x === END.x && y === END.y;
  }

  function isTerminal(x, y) {
    return isStart(x, y) || isEnd(x, y);
  }

  function generateTreeMasks() {
    const masks = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
    const visited = Array.from({ length: ROWS }, () => Array(COLS).fill(false));
    const frontier = [];

    function addFrontier(x, y) {
      for (const d of DIRS) {
        const nx = x + d.x;
        const ny = y + d.y;
        if (!inBounds(nx, ny)) continue;
        if (visited[ny][nx]) continue;
        frontier.push({ x, y, nx, ny, bit: d.bit, opposite: oppositeBit(d.bit) });
      }
    }

    visited[START.y][START.x] = true;
    addFrontier(START.x, START.y);

    while (frontier.length) {
      const i = rand(frontier.length);
      const edge = frontier.splice(i, 1)[0];

      if (visited[edge.ny][edge.nx]) continue;

      masks[edge.y][edge.x] |= edge.bit;
      masks[edge.ny][edge.nx] |= edge.opposite;
      visited[edge.ny][edge.nx] = true;
      addFrontier(edge.nx, edge.ny);
    }

    return masks;
  }

  function countInternalDeadEnds(masks) {
    let count = 0;
    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        if (isTerminal(x, y)) continue;
        if (degree(masks[y][x]) === 1) count++;
      }
    }
    return count;
  }

  function buildPuzzle() {
    for (let attempt = 0; ; attempt++) {
      const baseMasks = generateTreeMasks();

      if (degree(baseMasks[START.y][START.x]) !== 1) continue;
      if (degree(baseMasks[END.y][END.x]) !== 1) continue;

      const internalDeadEnds = countInternalDeadEnds(baseMasks);
      if (attempt < 2000 && internalDeadEnds !== TARGET_INTERNAL_DEAD_ENDS) continue;

      const finalMasks = baseMasks.map(row => row.slice());
      finalMasks[START.y][START.x] |= START.outsideBit;
      finalMasks[END.y][END.x] |= END.outsideBit;

      solution = finalMasks;

      grid = Array.from({ length: ROWS }, (_, y) =>
        Array.from({ length: COLS }, (_, x) => {
          let m = solution[y][x];
          const rotTimes = degree(m) === 4 ? 0 : rand(4);
          for (let i = 0; i < rotTimes; i++) m = rotateMaskLeft(m);
          return { mask: m };
        })
      );

      if (isExactlySolved()) {
        outer:
        for (let y = 0; y < ROWS; y++) {
          for (let x = 0; x < COLS; x++) {
            if (degree(grid[y][x].mask) !== 4) {
              grid[y][x].mask = rotateMaskLeft(grid[y][x].mask);
              break outer;
            }
          }
        }
      }

      return;
    }
  }

  function isExactlySolved() {
    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        if (grid[y][x].mask !== solution[y][x]) return false;
      }
    }
    return true;
  }

  function getOpenSides(mask, x, y) {
    const opens = [];
    if (mask & 1) opens.push({ nx: x, ny: y - 1, bit: 1, opposite: 4, outside: y === 0 });
    if (mask & 2) opens.push({ nx: x + 1, ny: y, bit: 2, opposite: 8, outside: x === COLS - 1 });
    if (mask & 4) opens.push({ nx: x, ny: y + 1, bit: 4, opposite: 1, outside: y === ROWS - 1 });
    if (mask & 8) opens.push({ nx: x - 1, ny: y, bit: 8, opposite: 2, outside: x === 0 });
    return opens;
  }

  function isSolved() {
    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        const mask = grid[y][x].mask;
        const opens = getOpenSides(mask, x, y);

        for (const o of opens) {
          if (o.outside) {
            const isStartOutside = (x === START.x && y === START.y && o.bit === START.outsideBit);
            const isEndOutside = (x === END.x && y === END.y && o.bit === END.outsideBit);
            if (!isStartOutside && !isEndOutside) return false;
            continue;
          }

          if (!inBounds(o.nx, o.ny)) return false;

          const neighborMask = grid[o.ny][o.nx].mask;
          if ((neighborMask & o.opposite) === 0) return false;
        }
      }
    }

    const visited = Array.from({ length: ROWS }, () => Array(COLS).fill(false));
    const queue = [{ x: START.x, y: START.y }];
    visited[START.y][START.x] = true;

    while (queue.length) {
      const { x, y } = queue.shift();
      const mask = grid[y][x].mask;
      const opens = getOpenSides(mask, x, y);

      for (const o of opens) {
        if (o.outside) continue;
        if (!inBounds(o.nx, o.ny)) continue;
        if (visited[o.ny][o.nx]) continue;

        const neighborMask = grid[o.ny][o.nx].mask;
        if ((neighborMask & o.opposite) === 0) continue;

        visited[o.ny][o.nx] = true;
        queue.push({ x: o.nx, y: o.ny });
      }
    }

    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        if (!visited[y][x]) return false;
      }
    }

    if ((grid[START.y][START.x].mask & START.outsideBit) === 0) return false;
    if ((grid[END.y][END.x].mask & END.outsideBit) === 0) return false;

    return true;
  }

  function roundedRect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function drawBoardFrame(boardX, boardY, boardW, boardH) {
    const grad = ctx.createLinearGradient(boardX, boardY, boardX + boardW, boardY + boardH);
    grad.addColorStop(0, "#58636c");
    grad.addColorStop(0.18, "#dfe6eb");
    grad.addColorStop(0.34, "#8a949d");
    grad.addColorStop(0.52, "#eef3f6");
    grad.addColorStop(0.7, "#8e98a1");
    grad.addColorStop(1, "#5a656f");

    ctx.fillStyle = grad;
    roundedRect(boardX - 8, boardY - 8, boardW + 16, boardH + 16, 12);
    ctx.fill();

    ctx.fillStyle = "#111922";
    roundedRect(boardX - 3, boardY - 3, boardW + 6, boardH + 6, 9);
    ctx.fill();

    ctx.strokeStyle = "rgba(255,255,255,.08)";
    ctx.lineWidth = 1;
    roundedRect(boardX - 3, boardY - 3, boardW + 6, boardH + 6, 9);
    ctx.stroke();
  }

  function getPieceType(mask) {
    const d = degree(mask);
    if (d === 4) return "cross";
    if (d === 3) return "tee";
    if (d === 2) {
      if (mask === 5 || mask === 10) return "straight";
      return "corner";
    }
    return "end";
  }

  function getPieceRotation(mask) {
    switch(mask) {
      case 1: return 0;
      case 2: return 90;
      case 4: return 180;
      case 8: return 270;

      case 3: return 0;
      case 6: return 90;
      case 12: return 180;
      case 9: return 270;

      case 5: return 0;
      case 10: return 90;

      case 11: return 0;
      case 7: return 90;
      case 14: return 180;
      case 13: return 270;

      case 15: return 0;

      default: return 0;
    }
  }

  function drawCellPiece(x, y, mask, cellSize, boardX, boardY, solved) {
    const type = getPieceType(mask);
    const img = IMAGES[type];
    if (!img) {
      const cx = boardX + x * cellSize + cellSize / 2;
      const cy = boardY + y * cellSize + cellSize / 2;
      ctx.lineCap = 'round';
      for (const [width, color] of [[.34,'#07121a'],[.24,solved?'#a5efda':'#92a8b8'],[.08,'#cddce5']]) {
        ctx.strokeStyle=color; ctx.lineWidth=cellSize*width; ctx.beginPath();
        for (const d of DIRS) if(mask & d.bit) {ctx.moveTo(cx,cy);ctx.lineTo(cx+d.x*cellSize/2,cy+d.y*cellSize/2);}
        ctx.stroke();
      }
      return;
    }

    const cx = boardX + x * cellSize + cellSize / 2;
    const cy = boardY + y * cellSize + cellSize / 2;
    const rot = getPieceRotation(mask) * Math.PI / 180;

    ctx.save();
    ctx.translate(cx, cy);

    if (solved) {
      ctx.shadowColor = "rgba(145,230,248,.42)";
      ctx.shadowBlur = 10;
    }

    ctx.rotate(rot);
    ctx.drawImage(img, -cellSize / 2, -cellSize / 2, cellSize, cellSize);
    ctx.restore();
  }

  function drawExternalConnector(side, rowIndex, cellSize, boardX, boardY, solved) {
    const key = side === "left" ? "connector_left" : "connector_right";
    const img = IMAGES[key];
    if (!img) {
      const edgeX=side==='left'?boardX:boardX+COLS*cellSize;
      const centerY=boardY+(rowIndex+.5)*cellSize;
      ctx.strokeStyle='#aad9ca';ctx.lineWidth=6;ctx.beginPath();
      ctx.moveTo(edgeX,centerY);ctx.lineTo(edgeX+(side==='left'?-16:16),centerY);ctx.stroke();
      return;
    }

    const y = boardY + rowIndex * cellSize;

    ctx.save();
    if (solved) {
      ctx.shadowColor = "rgba(145,230,248,.42)";
      ctx.shadowBlur = 10;
    }

    if (side === "left") {
      ctx.drawImage(img, boardX - cellSize, y, cellSize, cellSize);
    } else {
      ctx.drawImage(img, boardX + COLS * cellSize, y, cellSize, cellSize);
    }
    ctx.restore();
  }

  function draw() {
    const { w, h, cellSize, boardW, boardH, boardX, boardY } = getBoardMetrics();
    ctx.clearRect(0, 0, w, h);

    const solved = solvedState;

    drawBoardFrame(boardX, boardY, boardW, boardH);

    ctx.fillStyle = "rgba(255,255,255,.018)";
    roundedRect(boardX, boardY, boardW, boardH, 8);
    ctx.fill();

    ctx.strokeStyle = "rgba(255,255,255,.04)";
    ctx.lineWidth = 1;
    for (let y = 0; y <= ROWS; y++) {
      ctx.beginPath();
      ctx.moveTo(boardX, boardY + y * cellSize);
      ctx.lineTo(boardX + boardW, boardY + y * cellSize);
      ctx.stroke();
    }
    for (let x = 0; x <= COLS; x++) {
      ctx.beginPath();
      ctx.moveTo(boardX + x * cellSize, boardY);
      ctx.lineTo(boardX + x * cellSize, boardY + boardH);
      ctx.stroke();
    }

    if (!imagesReady) {
      ctx.fillStyle = "#d8e4eb";
      ctx.font = "16px Microsoft JhengHei";
      ctx.textAlign = "center";
      ctx.fillText("正在準備通風管…", w / 2, h / 2);
      return;
    }

    drawExternalConnector("left", START.y, cellSize, boardX, boardY, solved);
    drawExternalConnector("right", END.y, cellSize, boardX, boardY, solved);

    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        drawCellPiece(x, y, grid[y][x].mask, cellSize, boardX, boardY, solved);
      }
    }
  }

  function rotateCell(x, y) {
    if (degree(grid[y][x].mask) === 4) return;
    grid[y][x].mask = rotateMaskLeft(grid[y][x].mask);
  }

  function handlePointer(clientX, clientY) {
    if (!introModal.classList.contains("hidden")) return;
    if (redirecting) return;
    if (!imagesReady) return;

    const rect = canvas.getBoundingClientRect();
    const { boardX, boardY, boardW, boardH, cellSize } = getBoardMetrics();

    const px = clientX - rect.left;
    const py = clientY - rect.top;

    if (px < boardX || px >= boardX + boardW || py < boardY || py >= boardY + boardH) return;

    const x = Math.floor((px - boardX) / cellSize);
    const y = Math.floor((py - boardY) / cellSize);

    rotateCell(x, y);
    solvedState = isSolved();
    draw();

    if (solvedState) {
      redirecting = true;
      save(1);
      successModal.classList.remove("hidden");
    }
  }

  canvas.addEventListener("pointerup", (e) => {
    handlePointer(e.clientX, e.clientY);
  });

  confirmBtn.addEventListener("click", () => {
    introModal.classList.add("hidden");
  });

  nextStepBtn.addEventListener("click", () => {
    goToStage(2);
  });

  new ResizeObserver(() => { if (canvas.clientWidth) resizeCanvas(); }).observe(canvas);

  buildPuzzle();
  solvedState = false;
  resizeCanvas();

  loadImages()
    .then(() => {
      imagesReady = true;
      draw();
    })
    .catch((err) => {
      console.error(err);
      alert("PNG 載入失敗，請檢查 img 資料夾與檔名是否正確。");
    });
}


function initStage2() {
  const COLS = 7;
  const ROWS = 11;

  const COLORS = {
    Y: "#efe84a",
    R: "#ff1d1d",
    P: "#a100ff",
    O: "#ff7a1f",
    G: "#7dff14",
    K: "#8fd8ff",
    M: "#f28ad3",
    T: "#43d8bc",
    C: "#e7edf5"
  };

  const PAIRS = [{"id": "Y", "a": [6, 10], "b": [3, 10]}, {"id": "R", "a": [2, 10], "b": [1, 8]}, {"id": "P", "a": [1, 7], "b": [2, 3]}, {"id": "O", "a": [2, 2], "b": [1, 1]}, {"id": "G", "a": [2, 1], "b": [5, 2]}, {"id": "K", "a": [5, 1], "b": [3, 3]}, {"id": "M", "a": [3, 4], "b": [3, 6]}, {"id": "T", "a": [3, 7], "b": [5, 7]}, {"id": "C", "a": [4, 7], "b": [5, 5]}];

  const canvas = document.getElementById("s2-game");
  const ctx = canvas.getContext("2d");
  const introModal = document.getElementById("s2-introModal");
  const successModal = document.getElementById("s2-successModal");
  const confirmBtn = document.getElementById("s2-confirmBtn");
  const nextStepBtn = document.getElementById("s2-nextStepBtn");

  let endpoints = new Map();
  let cellToEndpoint = new Map();
  let paths = {};
  let draggingColor = null;
  let dragPath = [];
  let solved = false;
  let redirecting = false;
  let lastPointer = null;

  function key(x, y) {
    return `${x},${y}`;
  }

  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(rect.width * dpr);
    canvas.height = Math.floor(rect.height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    draw();
  }

  function initBoard() {
    endpoints = new Map();
    cellToEndpoint = new Map();
    paths = {};
    solved = false;
    redirecting = false;
    draggingColor = null;
    dragPath = [];
    lastPointer = null;

    for (const pair of PAIRS) {
      const [ax, ay] = pair.a;
      const [bx, by] = pair.b;
      endpoints.set(pair.id, { a: pair.a, b: pair.b });
      cellToEndpoint.set(key(ax, ay), pair.id);
      cellToEndpoint.set(key(bx, by), pair.id);
      paths[pair.id] = [];
    }
  }

  function getCellSize(rectW, rectH) {
    const topArea = 72;
    const sidePad = 20;
    const bottomPad = 18;
    const size = Math.min(
      (rectW - sidePad * 2) / COLS,
      (rectH - topArea - bottomPad) / ROWS
    );
    const boardW = size * COLS;
    const boardH = size * ROWS;
    const boardX = (rectW - boardW) / 2;
    const boardY = topArea;
    return { size, boardX, boardY, boardW, boardH };
  }

  function inBounds(x, y) {
    return x >= 0 && y >= 0 && x < COLS && y < ROWS;
  }

  function areAdjacent(a, b) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y) === 1;
  }

  function sameCell(a, b) {
    return a.x === b.x && a.y === b.y;
  }

  function findPathIndex(path, x, y) {
    return path.findIndex(p => p.x === x && p.y === y);
  }

  function isEndpointCell(x, y) {
    return cellToEndpoint.has(key(x, y));
  }

  function endpointColorAt(x, y) {
    return cellToEndpoint.get(key(x, y)) || null;
  }

  function cellOccupiedByOtherColor(color, x, y) {
    for (const id of Object.keys(paths)) {
      if (id === color) continue;
      if (findPathIndex(paths[id], x, y) !== -1) return true;
    }
    const epColor = endpointColorAt(x, y);
    return epColor !== null && epColor !== color;
  }

  function clearPath(color) {
    paths[color] = [];
  }

  function startDragFrom(color, startCell) {
    draggingColor = color;
    dragPath = [startCell];
    lastPointer = null;
    clearPath(color);
  }

  function tryStepTo(cell) {
    if (!draggingColor) return;

    const last = dragPath[dragPath.length - 1];
    if (sameCell(last, cell)) return;
    if (!inBounds(cell.x, cell.y)) return;

    const dx = cell.x - last.x;
    const dy = cell.y - last.y;
    if (Math.abs(dx) + Math.abs(dy) !== 1) return;

    if (cellOccupiedByOtherColor(draggingColor, cell.x, cell.y)) return;

    const backIndex = findPathIndex(dragPath, cell.x, cell.y);
    if (backIndex !== -1) {
      dragPath = dragPath.slice(0, backIndex + 1);
      return;
    }

    const epColor = endpointColorAt(cell.x, cell.y);
    if (epColor !== null && epColor !== draggingColor) return;

    if (dragPath.length > 1 && endpointColorAt(last.x, last.y) === draggingColor) return;
    dragPath.push(cell);
  }

  function updateDragByPointer(clientX, clientY) {
    if (!draggingColor) return;

    const rect = canvas.getBoundingClientRect();
    const { size, boardX, boardY, boardW, boardH } = getCellSize(rect.width, rect.height);
    const px = clientX - rect.left;
    const py = clientY - rect.top;

    if (px < boardX || px >= boardX + boardW || py < boardY || py >= boardY + boardH) {
      lastPointer = { x: px, y: py };
      return;
    }

    const currentCell = {
      x: Math.floor((px - boardX) / size),
      y: Math.floor((py - boardY) / size)
    };

    // Walk across skipped cells when a finger moves faster than pointer events.
    for (let step = 0; step < COLS + ROWS; step++) {
      const last = dragPath[dragPath.length - 1];
      if (sameCell(last, currentCell)) break;
      const dx = currentCell.x - last.x, dy = currentCell.y - last.y;
      const next = Math.abs(dx) >= Math.abs(dy)
        ? {x:last.x + Math.sign(dx), y:last.y}
        : {x:last.x, y:last.y + Math.sign(dy)};
      tryStepTo(next);
      if(sameCell(last, dragPath[dragPath.length - 1])) break;
    }

    lastPointer = { x: px, y: py };
  }

function finishDrag() {
  if (!draggingColor || dragPath.length === 0) {
    draggingColor = null;
    dragPath = [];
    return;
  }

  const color = draggingColor;
  const start = dragPath[0];
  const end = dragPath[dragPath.length - 1];
  const endpointsPair = endpoints.get(color);

  const a = { x: endpointsPair.a[0], y: endpointsPair.a[1] };
  const b = { x: endpointsPair.b[0], y: endpointsPair.b[1] };

  const startIsA = sameCell(start, a);
  const startIsB = sameCell(start, b);
  const endIsA = sameCell(end, a);
  const endIsB = sameCell(end, b);

  if ((startIsA && endIsB) || (startIsB && endIsA)) {
    let middle = dragPath.slice(1, dragPath.length - 1);

    if (startIsB && endIsA) {
      middle.reverse();
    }

    paths[color] = middle;
  } else {
    paths[color] = [];
  }

  draggingColor = null;
  dragPath = [];
  lastPointer = null;

  solved = isSolved();
  draw();

  if (solved && !redirecting) {
    redirecting = true;
    save(2);
    successModal.classList.remove("hidden");
  }
}
  function isSolved() {
    const occupied = new Set();

    for (const pair of PAIRS) {
      const color = pair.id;
      const path = paths[color];

      // 每一組都必須真的被連起來
      if (path.length === 0) return false;

      const full = [{ x: pair.a[0], y: pair.a[1] }, ...path, { x: pair.b[0], y: pair.b[1] }];

      for (let i = 1; i < full.length; i++) {
        if (!areAdjacent(full[i - 1], full[i])) return false;
      }

      for (let i = 0; i < full.length; i++) {
        const k = key(full[i].x, full[i].y);
        if (occupied.has(k)) return false;
        occupied.add(k);
      }
    }

    return occupied.size === COLS * ROWS;
  }

  function roundedRect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function drawBoardFrame(boardX, boardY, boardW, boardH) {
    const grad = ctx.createLinearGradient(boardX, boardY, boardX + boardW, boardY + boardH);
    grad.addColorStop(0, "#58715f");
    grad.addColorStop(0.18, "#87a087");
    grad.addColorStop(0.34, "#4d6a55");
    grad.addColorStop(0.52, "#8aa38c");
    grad.addColorStop(0.7, "#47634f");
    grad.addColorStop(1, "#2f4a37");

    ctx.fillStyle = grad;
    roundedRect(boardX - 8, boardY - 8, boardW + 16, boardH + 16, 10);
    ctx.fill();

    ctx.fillStyle = "#101f22";
    roundedRect(boardX - 2, boardY - 2, boardW + 4, boardH + 4, 6);
    ctx.fill();
  }

  function drawGrid(boardX, boardY, boardW, boardH, size) {
    ctx.fillStyle = "#101f22";
    ctx.fillRect(boardX, boardY, boardW, boardH);

    ctx.strokeStyle = "rgba(255,255,255,.1)";
    ctx.lineWidth = 1;

    for (let x = 0; x <= COLS; x++) {
      ctx.beginPath();
      ctx.moveTo(boardX + x * size, boardY);
      ctx.lineTo(boardX + x * size, boardY + boardH);
      ctx.stroke();
    }

    for (let y = 0; y <= ROWS; y++) {
      ctx.beginPath();
      ctx.moveTo(boardX, boardY + y * size);
      ctx.lineTo(boardX + boardW, boardY + y * size);
      ctx.stroke();
    }
  }

  function cellCenter(x, y, boardX, boardY, size) {
    return {
      x: boardX + x * size + size / 2,
      y: boardY + y * size + size / 2
    };
  }

  function drawPathLine(points, color, boardX, boardY, size, preview = false) {
    if (points.length < 2) return;

    ctx.save();
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.strokeStyle = color;
    ctx.lineWidth = size * 0.28;
    ctx.shadowColor = preview ? "transparent" : color;
    ctx.shadowBlur = preview ? 0 : 6;
    ctx.globalAlpha = preview ? 0.82 : 1;

    ctx.beginPath();
    const p0 = cellCenter(points[0].x, points[0].y, boardX, boardY, size);
    ctx.moveTo(p0.x, p0.y);

    for (let i = 1; i < points.length; i++) {
      const p = cellCenter(points[i].x, points[i].y, boardX, boardY, size);
      ctx.lineTo(p.x, p.y);
    }

    ctx.stroke();
    ctx.restore();
  }

  function drawEndpoint(x, y, color, boardX, boardY, size) {
    const c = cellCenter(x, y, boardX, boardY, size);
    const outerR = size * 0.32;
    const innerR = size * 0.23;

    ctx.save();

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(c.x, c.y, outerR, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#2e2e34";
    ctx.beginPath();
    ctx.arc(c.x, c.y, innerR, 0, Math.PI * 2);
    ctx.fill();

    const grad = ctx.createRadialGradient(
      c.x - innerR * 0.3, c.y - innerR * 0.35, innerR * 0.2,
      c.x, c.y, innerR
    );
    grad.addColorStop(0, "#666");
    grad.addColorStop(0.55, "#303038");
    grad.addColorStop(1, "#111");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(c.x, c.y, innerR * 0.92, 0, Math.PI * 2);
    ctx.fill();

    const number=PAIRS.findIndex(p=>COLORS[p.id]===color)+1;
    ctx.fillStyle='#f4f7fa';ctx.font=`600 ${Math.max(10,size*.28)}px sans-serif`;
    ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(String(number),c.x,c.y);
    ctx.restore();
  }

  function draw() {
    const w = canvas.getBoundingClientRect().width;
    const h = canvas.getBoundingClientRect().height;
    ctx.clearRect(0, 0, w, h);

    const { size, boardX, boardY, boardW, boardH } = getCellSize(w, h);

    drawBoardFrame(boardX, boardY, boardW, boardH);
    drawGrid(boardX, boardY, boardW, boardH, size);

    for (const pair of PAIRS) {
      const color = COLORS[pair.id];
      const mid = paths[pair.id];

      if (mid.length > 0) {
        const points = [
          { x: pair.a[0], y: pair.a[1] },
          ...mid,
          { x: pair.b[0], y: pair.b[1] }
        ];
        drawPathLine(points, color, boardX, boardY, size, false);
      }
    }

    if (draggingColor && dragPath.length > 1) {
      drawPathLine(dragPath, COLORS[draggingColor], boardX, boardY, size, true);
    }

    for (const pair of PAIRS) {
      drawEndpoint(pair.a[0], pair.a[1], COLORS[pair.id], boardX, boardY, size);
      drawEndpoint(pair.b[0], pair.b[1], COLORS[pair.id], boardX, boardY, size);
    }
    const used=new Set();let connected=0;
    for(const pair of PAIRS) if(paths[pair.id].length){connected++;[pair.a,pair.b].forEach(([x,y])=>used.add(key(x,y)));paths[pair.id].forEach(p=>used.add(key(p.x,p.y)));}
    document.getElementById('wireProgress').textContent=`已連接 ${connected} / 9 · 已通電 ${used.size} / ${COLS*ROWS}`;
  }

  function eventToCell(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    const { size, boardX, boardY, boardW, boardH } = getCellSize(rect.width, rect.height);
    const px = clientX - rect.left;
    const py = clientY - rect.top;

    if (px < boardX || px >= boardX + boardW || py < boardY || py >= boardY + boardH) {
      return null;
    }

    return {
      x: Math.floor((px - boardX) / size),
      y: Math.floor((py - boardY) / size)
    };
  }

  function onPointerDown(clientX, clientY) {
    if (!introModal.classList.contains("hidden")) return;
    if (!successModal.classList.contains("hidden")) return;
    if (redirecting && solved) return;

    const cell = eventToCell(clientX, clientY);
    if (!cell) return;

    const color = endpointColorAt(cell.x, cell.y);
    if (!color) return;

    startDragFrom(color, cell);
    draw();
  }

  function onPointerMove(clientX, clientY) {
    if (!draggingColor) return;
    updateDragByPointer(clientX, clientY);
    draw();
  }

  function onPointerUp() {
    if (!draggingColor) return;
    finishDrag();
  }

  let pointerId = null;
  canvas.addEventListener('pointerdown', e => {
    if (pointerId !== null) return;
    pointerId = e.pointerId;
    canvas.setPointerCapture(e.pointerId);
    onPointerDown(e.clientX, e.clientY);
  });
  canvas.addEventListener('pointermove', e => {
    if (e.pointerId === pointerId) onPointerMove(e.clientX, e.clientY);
  });
  canvas.addEventListener('pointerup', e => {
    if(e.pointerId !== pointerId) return;
    onPointerMove(e.clientX, e.clientY); onPointerUp(); pointerId = null;
  });
  canvas.addEventListener('pointercancel', () => {
    draggingColor = null; dragPath = []; pointerId = null; draw();
  });

  confirmBtn.addEventListener("click", () => {
    introModal.classList.add("hidden");
  });

  nextStepBtn.addEventListener("click", () => {
    goToStage(3);
  });

  new ResizeObserver(() => { if (canvas.clientWidth) resizeCanvas(); }).observe(canvas);

  initBoard();
  resizeCanvas();
}

function initStage3() {
  // Geometry is shared by SVG rendering, occlusion checks and solvable-order generation.
  const COLORS = [
    ['red','紅','#ad6264'],['orange','橙','#bf865b'],['blue','藍','#608ba8'],
    ['purple','紫','#86739c'],['pink','粉','#ba8f9d'],['yellow','黃','#b5a260'],['gray','灰','#a9b6bd']
  ];
  const palette = Object.fromEntries(COLORS.map(([id,name,hex])=>[id,{name,hex}]));
  const TOTAL = 108, CAPACITY = 7;
  const plates = document.getElementById('plates');
  const status = document.getElementById('screwStatus');
  const vent = document.getElementById('vent');
  let pieces, sequence, trays, buffer, removed, ventRemaining, complete;
  function shuffle(items) {
    const result=[...items];
    for(let i=result.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[result[i],result[j]]=[result[j],result[i]];}
    return result;
  }
  const NS='http://www.w3.org/2000/svg';
  const motifs = {
    butterfly: { outline:[[-82,-70],[-36,-62],[0,-24],[36,-62],[82,-70],[73,-25],[50,0],[73,25],[82,70],[36,62],[0,24],[-36,62],[-82,70],[-73,25],[-50,0],[-73,-25]], screws:[[-48,-38],[48,-38],[-48,38],[48,38]] },
    hexagon: {outline:[[-46,-76],[44,-76],[85,-2],[42,76],[-42,76],[-85,-2]], screws:[[-30,-37],[30,-37],[-30,37],[30,37]]},
    star: {outline:Array.from({length:10},(_,i)=>{const angle=-Math.PI/2+i*Math.PI/5,r=i%2?43:88;return [Math.cos(angle)*r,Math.sin(angle)*r];}), screws:[[0,-50],[-47,-13],[47,-13],[0,36]]}
  };
  const tints=['#65747c','#7a8487','#716f67','#4d6069','#8c9497'];
  function roundedOutline(points) {
    // Sample quadratic corners once. The exact same polygon is drawn and tested.
    const result=[];
    for(let i=0;i<points.length;i++) {
      const prev=points[(i+points.length-1)%points.length],p=points[i],next=points[(i+1)%points.length];
      const a=[(prev[0]+p[0])/2,(prev[1]+p[1])/2],b=[(next[0]+p[0])/2,(next[1]+p[1])/2];
      for(let j=0;j<8;j++){const t=j/8,u=1-t;result.push([u*u*a[0]+2*u*t*p[0]+t*t*b[0],u*u*a[1]+2*u*t*p[1]+t*t*b[1]]);}
    }return result;
  }
  function transform(point,piece) {
    const c=Math.cos(piece.angle),s=Math.sin(piece.angle);
    return [piece.x+point[0]*c-point[1]*s,piece.y+point[0]*s+point[1]*c];
  }
  function inside(x,y,polygon) {
    let hit=false;
    for(let i=0,j=polygon.length-1;i<polygon.length;j=i++) {
      const [ax,ay]=polygon[i],[bx,by]=polygon[j];
      if((ay>y)!==(by>y)&&x<(bx-ax)*(y-ay)/(by-ay)+ax)hit=!hit;
    }return hit;
  }
  function accessible(screw) {
    if(screw.removed)return false;
    return screw.blockers.every(p=>p.screws.every(s=>s.removed));
  }

  function reset() {
    pieces=[];sequence=[];
    const anchors=[[88,99],[218,86],[319,138],[100,253],[229,250],[322,315],[84,420],[214,438],[316,458]];
    for(let layer=0;layer<3;layer++)for(let i=0;i<9;i++) {
      const name=['butterfly','hexagon','star'][(i+layer)%3],motif=motifs[name];
      const piece={z:layer*9+i,x:anchors[i][0]+(layer-1)*9+(i%2?-8:4),y:anchors[i][1]+(layer-1)*15,angle:([-14,9,-6,16,-11,7,-8,12,-5][i]+layer*5)*Math.PI/180,tint:tints[(i+layer*2)%5],screws:[]};
      // Keep artwork fully inside the mobile viewBox.
      piece.polygon=roundedOutline(motif.outline).map(p=>transform(p,piece));
      piece.screws=motif.screws.map((point)=>{const [x,y]=transform(point,piece);return {x,y,piece,removed:false,color:null};});
      pieces.push(piece);
    }
    // Geometry stays fixed until a plate drops. Cache blockers for mobile performance.
    for(const piece of pieces)for(const screw of piece.screws) {
      const samples=[[0,0],[12,0],[-12,0],[0,12],[0,-12]];
      screw.blockers=pieces.filter(p=>p.z>piece.z&&samples.some(([dx,dy])=>inside(screw.x+dx,screw.y+dy,p.polygon)));
    }
    // Build a legal order using actual occlusion, then color groups of four.
    // Interleave exposed screws for mixed-color plates without random dead starts.
    const groups=shuffle(Array.from({length:27},(_,i)=>COLORS[i%7][0]));
    for(let i=0;i<TOTAL;i++) {
      const available=pieces.flatMap(p=>p.screws).filter(accessible);
      if(!available.length)throw new Error('Board geometry has no exposed screw');
      const screw=available[Math.floor(Math.random()*available.length)];
      screw.order=i;screw.color=groups[Math.floor(i/4)];screw.removed=true;sequence.push(screw);
    }
    sequence.forEach(s=>s.removed=false);
    trays=[];buffer=[];removed=0;complete=false;ventRemaining=4;
    vent.hidden=false;vent.classList.remove('opened');plates.hidden=false;
    setupVent();
    document.getElementById('retryScrews').disabled=false;
    settle();render();
    status.textContent='拆下露出的螺絲；被板件壓住的螺絲暫時無法轉動。';
  }
  function svgElement(name,attributes={}) {
    const element=document.createElementNS(NS,name);
    Object.entries(attributes).forEach(([key,value])=>element.setAttribute(key,String(value)));
    return element;
  }
  function drawPieces() {
    const svg=svgElement('svg',{viewBox:'-24 -20 464 610',class:'screw-scene','aria-label':'交疊的金屬板件與螺絲'});
    const defs=svgElement('defs');
    const grain=svgElement('pattern',{id:'metal-grain',width:6,height:4,patternUnits:'userSpaceOnUse'});
    grain.append(svgElement('path',{d:'M0 1H6',stroke:'#eff6f5','stroke-opacity':'.07','stroke-width':.6}));defs.append(grain);
    pieces.forEach(piece=>{
      const gradient=svgElement('linearGradient',{id:`glass-${piece.z}`,x1:'0',y1:'0',x2:'1',y2:'1'});
      [['0','#c8cfd0',1],['.18',piece.tint,1],['.43','#9ba5a7',1],['.48','#58656b',1],['.8',piece.tint,1],['1','#343f46',1]].forEach(([offset,color,opacity])=>gradient.append(svgElement('stop',{offset,'stop-color':color,'stop-opacity':opacity})));
      defs.append(gradient);
    });svg.append(defs);
    for(const piece of pieces) {
      if(piece.screws.every(s=>s.removed))continue;
      const group=svgElement('g',{'data-piece':piece.z,class:'glass-piece'});
      const points=piece.polygon.map(p=>p.join(',')).join(' ');
      group.append(svgElement('polygon',{points,fill:'#020d19','fill-opacity':'.22',transform:'translate(0 5)'}));
      group.append(svgElement('polygon',{points,fill:`url(#glass-${piece.z})`,stroke:'#c2cccc','stroke-opacity':'.7','stroke-width':'2.2','stroke-linejoin':'round',class:'glass-face'}));
      group.append(svgElement('polygon',{points,fill:'url(#metal-grain)','pointer-events':'none'}));
      for(const screw of piece.screws) {
        if(screw.removed){group.append(svgElement('circle',{cx:screw.x,cy:screw.y,r:11,fill:'#112234','fill-opacity':'.42',stroke:'#f0f7ff','stroke-opacity':'.3','stroke-width':2}));continue;}
        const open=accessible(screw);
        const button=svgElement('g',{transform:`translate(${screw.x} ${screw.y})`,class:'real-screw'+(open?' exposed':' covered'),'data-order':screw.order,role:'button',tabindex:open?0:-1,'aria-disabled':!open,'aria-label':`${palette[screw.color].name}色螺絲${open?'':'，被板件壓住'}`});
        button.append(svgElement('circle',{r:25,fill:'transparent',class:'screw-hit'}));
        button.append(svgElement('circle',{cy:3,r:20,fill:'#1c203e','fill-opacity':'.5'}));
        button.append(svgElement('circle',{r:19,fill:palette[screw.color].hex,stroke:'#fff','stroke-opacity':'.6','stroke-width':1.5}));
        button.append(svgElement('circle',{r:13.5,fill:'#acb8bd',stroke:'#38464e','stroke-width':1}));
        button.append(svgElement('path',{d:'M-13 -7 A15 15 0 0 1 10 -11',fill:'none',stroke:'#fff','stroke-opacity':'.47','stroke-width':2.5,'stroke-linecap':'round'}));
        button.append(svgElement('path',{d:'M-3 -10 H3 V-3 H10 V3 H3 V10 H-3 V3 H-10 V-3 H-3 Z',fill:'#263047','fill-opacity':'.85',transform:`rotate(${piece.z*17%90})`}));
        group.append(button);
      }
      svg.append(group);
    }
    plates.replaceChildren(svg);
  }
  function nextColor() {
    const active=new Set(trays.map(t=>t.color));
    // Prefer waiting screws, then the earliest remaining group.
    return buffer.find(c=>!active.has(c)) || sequence.find(s=>!s.removed&&!active.has(s.color))?.color;
  }
  function settle() {
    for(let pass=0;pass<40;pass++) {
      let changed=false;
      while(trays.length<4) {
        const color=nextColor();if(!color)break;
        trays.push({color,count:0});changed=true;
      }
      for(const tray of trays) {
        while(tray.count<4 && buffer.includes(tray.color)) {
          buffer.splice(buffer.indexOf(tray.color),1);tray.count++;changed=true;
        }
      }
      if(trays.some(t=>t.count===4)){trays=trays.filter(t=>t.count<4);changed=true;}
      if(!changed)break;
    }
  }
  function dot(color, filled=true) {
    const item=document.createElement('span');item.className='slot'+(filled?' filled':'');
    if(color)item.style.setProperty('--color',palette[color].hex);
    return item;
  }
  function render() {
    const top=document.getElementById('trays');top.replaceChildren();
    for(let i=0;i<4;i++) {
      const tray=trays[i], card=document.createElement('div');card.className='tray-card';
      const label=document.createElement('span');label.className='tray-name';
      label.textContent=tray?`${palette[tray.color].name} ${tray.count}/4`:'已收好';
      if(tray)card.style.setProperty('--color',palette[tray.color].hex);
      card.append(label);const slots=document.createElement('div');slots.className='tray-slots';
      for(let j=0;j<4;j++)slots.append(dot(tray?.color,!!tray&&j<tray.count));
      card.append(slots);top.append(card);
    }
    const row=document.getElementById('buffer');row.replaceChildren();
    for(let i=0;i<CAPACITY;i++)row.append(dot(buffer[i],!!buffer[i]));
    document.getElementById('bufferCount').textContent=`${buffer.length} / ${CAPACITY}`;
    document.getElementById('screwProgress').textContent=`已拆 ${removed} / ${TOTAL}`;
    drawPieces();
  }
  function removeScrew(screw) {
    if(complete||screw.removed||!document.getElementById('s3-introModal').classList.contains('hidden'))return;
    if(!accessible(screw)) {
      status.textContent='這顆螺絲被上方板件壓住了，先拆掉上面的板件。';return;
    }
    const tray=trays.find(t=>t.color===screw.color);
    if(!tray&&buffer.length>=CAPACITY) {
      status.textContent='暫存區已滿。請先拆收集盒需要的顏色；無路可走時可重試本關。';return;
    }
    screw.removed=true;removed++;
    if(tray)tray.count++;else buffer.push(screw.color);
    const falling=screw.piece.screws.every(s=>s.removed);
    const ghost=falling?plates.querySelector(`[data-piece="${screw.piece.z}"]`)?.cloneNode(true):null;
    settle();render();
    if(ghost){
      ghost.removeAttribute('data-piece');ghost.classList.add('falling-piece');ghost.setAttribute('aria-hidden','true');
      ghost.querySelectorAll('[tabindex]').forEach(n=>n.setAttribute('tabindex','-1'));
      plates.querySelector('svg')?.append(ghost);setTimeout(()=>ghost.remove(),550);
    }
    status.textContent=buffer.length>=CAPACITY?'暫存已滿，請先完成上方收集盒。':'點選露出的螺絲，放入對應的收集盒。';
    if(removed===TOTAL) openVent();
  }
  function setupVent() {
    const container=document.getElementById('ventScrews');container.replaceChildren();
    for(let i=0;i<4;i++) {
      const button=document.createElement('button');button.className=`vent-screw v${i}`;
      button.disabled=true;button.setAttribute('aria-label',`出口螺絲 ${i+1}`);
      button.addEventListener('click',()=>{
        if(removed!==TOTAL||button.disabled||complete||!document.getElementById('s3-introModal').classList.contains('hidden'))return;
        button.disabled=true;button.classList.add('removed');ventRemaining--;
        if(!ventRemaining) {
          complete=true;finishEscapeTimer();save(3);vent.classList.add('opened');
          document.getElementById('retryScrews').disabled=true;
          beginEscape();
        }
      });container.append(button);
    }
  }
  function openVent() {
    plates.hidden=true;
    status.textContent='';
    vent.querySelectorAll('.vent-screw').forEach(button=>button.disabled=false);
  }
  plates.addEventListener('keydown',event=>{
    if(event.key==='Enter'||event.key===' '){const target=event.target.closest('[data-order]');if(target){event.preventDefault();removeScrew(sequence[Number(target.dataset.order)]);}}
  });
  plates.addEventListener('click',event=>{
    const target=event.target.closest('[data-order]');if(target)removeScrew(sequence[Number(target.dataset.order)]);
  });
  document.getElementById('retryScrews').addEventListener('click',()=>ask('重試螺絲拆解？','只會重新排列本關的螺絲，前兩關不需要重玩。',reset));
  document.getElementById('s3-confirmBtn').addEventListener('click',()=>document.getElementById('s3-introModal').classList.add('hidden'));
  reset();
}



// ===== 車站、文字結局與獨立紀念圖片 =====
let escaping = false;
let selectedEnding = null;
let stationReady = false;
let wantSound = false;
let audioFadeToken = 0;
let downloadToken = 0;
const pause = ms => new Promise(resolve => setTimeout(resolve,ms));
function normalizeTicket(value) { return String(value).trim().toUpperCase(); }
function matchTicket(value) {
  const ticket = normalizeTicket(value);
  return CONFIG.endings.find(ending=>normalizeTicket(ending.ticket)===ticket) || null;
}
function updateSoundButton() {
  const audio = document.getElementById('stationAudio');
  document.getElementById('soundBtn').textContent = audio.paused ? '開啟車站音效' : '關閉車站音效';
}
async function playStationSound(volume = 0.65) {
  const audio = document.getElementById('stationAudio');
  wantSound = true;
  audio.volume = volume;
  try { await audio.play(); } catch(error) { /* Mobile autoplay may require the sound button. */ }
  updateSoundButton();
}
function prepareStation() {
  if(stationReady)return;
  stationReady = true;
    document.getElementById('playerSurname').value =
    progress.surname || '';

  document.getElementById('playerGivenName').value =
    progress.givenName || '';
  const scene=document.getElementById('stationScene');
  scene.addEventListener('error',()=>{scene.hidden=true;});
  scene.addEventListener('load',()=>{
    document.getElementById('stationView').style.setProperty(
      '--station-photo-ratio',`${scene.naturalWidth} / ${scene.naturalHeight}`
    );
  });
  scene.src=CONFIG.stationImage;
  const audio=document.getElementById('stationAudio');audio.src=CONFIG.stationAudio;
  audio.addEventListener('play',updateSoundButton);
  audio.addEventListener('pause',updateSoundButton);
  audio.addEventListener('error',()=>{
    document.getElementById('soundBtn').textContent='音效無法載入，點此重試';
  });
  document.getElementById('soundBtn').addEventListener('click',()=>{
    audioFadeToken++;
    if(!audio.paused){wantSound=false;audio.pause();}
    else {if(audio.error)audio.load();playStationSound();}
  });
  document.getElementById('ticketForm').addEventListener('submit',event=>{
    event.preventDefault();
	const surnameInput = document.getElementById('playerSurname');
    const givenNameInput = document.getElementById('playerGivenName');

    const surname = surnameInput.value.trim();
    const givenName = givenNameInput.value.trim();

    if (!surname || !givenName) {
      document.getElementById('ticketError').textContent =
        '請完整填寫你的姓與名。';

      (!surname ? surnameInput : givenNameInput).focus();
      return;
    }
    if(progress.completed<3)return;
    const input=document.getElementById('ticketNumber');
    const ending=matchTicket(input.value);
    document.getElementById('ticketError').textContent='';
    input.removeAttribute('aria-invalid');
    if(!ending){
      document.getElementById('ticketError').textContent=input.value.trim()?'查無此車票，請確認號碼後重新輸入。':'請先輸入你的車票號碼。';
      input.setAttribute('aria-invalid','true');input.focus();return;
    }
    if(wantSound&&audio.paused)playStationSound();
    progress.surname = surname;
    progress.givenName = givenName;

    showEnding(ending);
  });
  document.getElementById('viewEscapeTimeBtn').addEventListener('click',showEscapeTime);
  document.getElementById('saveEndingBtn').addEventListener('click',downloadEnding);
  document.getElementById('anotherTicket').addEventListener('click',()=>{
    downloadToken++;selectedEnding=null;clearEndingExport();save(3,null);
    document.getElementById('endingPanel').hidden=true;
    document.getElementById('ticketPanel').hidden=false;
    document.getElementById('ticketNumber').value='';
    document.getElementById('ticketNumber').focus();window.scrollTo(0,0);
  });
  document.addEventListener('visibilitychange',()=>{
    if(document.hidden)audio.pause();
    else if(wantSound&&!document.getElementById('stationView').hidden)playStationSound();
  });
}
function showStation(restoreEnding=true) {
  prepareStation();
  document.querySelector('.app').hidden=true;
  document.getElementById('stationView').hidden=false;
  document.body.classList.add('at-station');
  document.title='高譚車站｜車票查驗';
  document.querySelector('meta[name="theme-color"]').content='#edf0e9';
  window.scrollTo(0,0);
  const ending=restoreEnding?CONFIG.endings.find(e=>e.id===progress.endingId):null;
  if(ending)showEnding(ending,false);
  else {document.getElementById('ticketPanel').hidden=false;document.getElementById('endingPanel').hidden=true;}
}
async function beginEscape() {
  if(escaping)return;
  escaping=true;
  prepareStation();
  // Start the audio in the final screw's user gesture, silently until the station appears.
  playStationSound(0);
  const veil=document.getElementById('whiteout');
  veil.hidden=false;
  document.querySelector('meta[name="theme-color"]').content='#ffffff';
  document.body.classList.add('escaping');
  document.querySelector('.app').inert=true;
  // Flush the initial opacity before beginning the all-white fade.
  void veil.offsetWidth;
  veil.classList.add('full-white');
  await pause(900);
  // A fully opaque #fff viewport is held with no text, dialog, image or controls.
  await pause(CONFIG.whiteHoldMs);
  const scene=document.getElementById('stationScene');
  if(scene.decode)await Promise.race([scene.decode().catch(()=>{}),pause(5000)]);
  showStation(false);
  veil.style.transitionDuration=`${CONFIG.stationFadeMs}ms`;
  veil.classList.remove('full-white');
  const token=++audioFadeToken,audio=document.getElementById('stationAudio');
  for(let step=1;step<=20;step++) {
    await pause(CONFIG.stationFadeMs/20);
    if(token===audioFadeToken&&!audio.paused)audio.volume=.65*step/20;
  }
  veil.hidden=true;document.body.classList.remove('escaping');
}
function showEnding(ending,persist=true) {
  selectedEnding=ending;downloadToken++;
  if(persist)save(3,ending.id);
  document.getElementById('ticketPanel').hidden=true;
  document.getElementById('endingPanel').hidden=false;
  document.getElementById('endingTitle').textContent=ending.title;
  // Plain text preserves paragraph breaks, and does not execute HTML supplied as story text.
  const playerCodes = {
    '姓': progress.surname || '',
    '名': progress.givenName || ''
  };

  document.getElementById('endingText').textContent =
    ending.text.replace(
      /\{\{(姓|名)\}\}/g,
      (_, code) => playerCodes[code]
    );
  document.getElementById('saveEndingBtn').disabled=false;
  clearEndingExport();
  window.scrollTo(0,0);
}
// Capture this station page locally: use the browser's laid-out glyph positions,
// then paint its backgrounds, borders and text to a PNG. No external CDN is needed.
async function captureEndingPage() {
  if(document.fonts?.ready)await document.fonts.ready;
  const source=document.getElementById('stationView');
  if(source.hidden)throw new Error('請先開啟結局。');
  const width=Math.min(580,Math.max(280,document.documentElement.clientWidth));
  const holder=document.createElement('div');
  holder.setAttribute('aria-hidden','true');holder.inert=true;
  Object.assign(holder.style,{position:'fixed',left:'-100000px',top:'0',width:`${width}px`,pointerEvents:'none',zIndex:'-1000'});
  const page=source.cloneNode(true);
  page.hidden=false;
  Object.assign(page.style,{width:`${width}px`,minHeight:`${window.innerHeight}px`,overflow:'visible'});
  // Remove controls before measuring so they leave no blank space in the export.
  page.querySelectorAll('button,a,form,[role="status"],#ticketPanel').forEach(node=>node.remove());
  const currentPhoto=document.getElementById('stationScene');
  if(currentPhoto.naturalWidth&&currentPhoto.naturalHeight){
    page.style.setProperty('--station-photo-ratio',`${currentPhoto.naturalWidth} / ${currentPhoto.naturalHeight}`);
  }
  page.querySelector('.ending-actions')?.remove();
  holder.append(page);document.body.append(holder);
  let canvas;
  try {
    const bounds=page.getBoundingClientRect();
    const height=Math.ceil(Math.max(page.scrollHeight,bounds.height));
    // Limit the backing-store size on phones without cropping any of the text.
    const scale=Math.min(2,16380/height,16380/width,Math.sqrt(12000000/(width*height)));
    if(scale<.35)throw new Error('結局文字過長，無法放入一張清晰圖片。請縮短內文後再試。');
    canvas=document.createElement('canvas');
    canvas.width=Math.ceil(width*scale);canvas.height=Math.ceil(height*scale);
    const ctx=canvas.getContext('2d');if(!ctx)throw new Error('無法建立圖片。');
    ctx.scale(scale,scale);
    const box=element=>{
      const r=element.getBoundingClientRect();return {x:r.left-bounds.left,y:r.top-bounds.top,w:r.width,h:r.height};
    };
    const transparent=color=>!color||color==='transparent'||/^rgba\([^)]*,\s*0\s*\)$/.test(color);
    function splitCSS(value) {
      let depth=0,start=0,result=[];
      for(let i=0;i<value.length;i++){
        if(value[i]==='(')depth++;if(value[i]===')')depth--;
        if(value[i]===','&&!depth){result.push(value.slice(start,i).trim());start=i+1;}
      }result.push(value.slice(start).trim());return result;
    }
    function gradient(value,b) {
      if(!value.startsWith('linear-gradient('))return null;
      const parts=splitCSS(value.slice(16,-1));
      let angle=180;
      if(/deg$/.test(parts[0]))angle=parseFloat(parts.shift());
      const rad=angle*Math.PI/180,dx=Math.sin(rad),dy=-Math.cos(rad);
      const length=Math.abs(b.w*dx)+Math.abs(b.h*dy),cx=b.x+b.w/2,cy=b.y+b.h/2;
      const fill=ctx.createLinearGradient(cx-dx*length/2,cy-dy*length/2,cx+dx*length/2,cy+dy*length/2);
      const stops=parts.map((part,i)=>{
        const m=part.match(/^(.*?)\s+([\d.]+)%$/);
        return {color:m?m[1]:part,offset:m?Number(m[2])/100:null};
      });
      if(stops[0].offset===null)stops[0].offset=0;
      if(stops.at(-1).offset===null)stops.at(-1).offset=1;
      for(let i=1;i<stops.length-1;i++)if(stops[i].offset===null){
        let end=i;while(stops[end].offset===null)end++;
        const from=stops[i-1].offset,to=stops[end].offset,count=end-i+1;
        for(let j=i;j<end;j++)stops[j].offset=from+(to-from)*(j-i+1)/count;
        i=end-1;
      }
      stops.forEach(stop=>fill.addColorStop(Math.max(0,Math.min(1,stop.offset)),stop.color));return fill;
    }
    function shape(b,r=0) {
      r=Math.min(r,b.w/2,b.h/2);ctx.beginPath();
      ctx.moveTo(b.x+r,b.y);ctx.arcTo(b.x+b.w,b.y,b.x+b.w,b.y+b.h,r);
      ctx.arcTo(b.x+b.w,b.y+b.h,b.x,b.y+b.h,r);ctx.arcTo(b.x,b.y+b.h,b.x,b.y,r);ctx.arcTo(b.x,b.y,b.x+b.w,b.y,r);ctx.closePath();
    }
    function background(element,customBox=null) {
      const style=getComputedStyle(element),b=customBox||box(element),radius=parseFloat(style.borderTopLeftRadius)||0;
      if(!b.w||!b.h)return;
      ctx.save();shape(b,radius);
      if(element.matches('.ending-panel')){ctx.shadowColor='rgba(16,34,27,.21)';ctx.shadowOffsetY=18;ctx.shadowBlur=36;}
      if(!transparent(style.backgroundColor)){ctx.fillStyle=style.backgroundColor;ctx.fill();}
      ctx.shadowColor='transparent';
      const fill=gradient(style.backgroundImage,b);
      if(fill){ctx.fillStyle=fill;ctx.fill();}
      ctx.clip();
      for(const [side,x,y,w,h] of [
        ['Top',b.x,b.y,b.w,parseFloat(style.borderTopWidth)||0],
        ['Bottom',b.x,b.y+b.h-(parseFloat(style.borderBottomWidth)||0),b.w,parseFloat(style.borderBottomWidth)||0],
        ['Left',b.x,b.y,parseFloat(style.borderLeftWidth)||0,b.h],
        ['Right',b.x+b.w-(parseFloat(style.borderRightWidth)||0),b.y,parseFloat(style.borderRightWidth)||0,b.h]
      ])if(w&&h&&!transparent(style[`border${side}Color`])){ctx.fillStyle=style[`border${side}Color`];ctx.fillRect(x,y,w,h);}
      ctx.restore();
    }
    ctx.fillStyle='#000';ctx.fillRect(0,0,width,height);
    background(page,{x:0,y:0,w:width,h:height});
    const photo=document.getElementById('stationScene');
    // Reuse the site's current photo; no ending-XX.jpg is fetched.
    if(!photo.hidden&&photo.complete&&photo.naturalWidth){
      const photoHeight=width*photo.naturalHeight/photo.naturalWidth;
      ctx.drawImage(photo,0,0,width,photoHeight);
    }
    const photoHeight=photo.naturalWidth&&photo.naturalHeight?width*photo.naturalHeight/photo.naturalWidth:width*1.5;
    const shade=page.querySelector('.station-shade');if(shade)background(shade,{x:0,y:0,w:width,h:photoHeight});
    const svgImages=new Map();
    for(const svg of page.querySelectorAll('svg')) {
      const copy=svg.cloneNode(true),style=getComputedStyle(svg);
      copy.setAttribute('xmlns','http://www.w3.org/2000/svg');
      copy.setAttribute('width',svg.getBoundingClientRect().width);copy.setAttribute('height',svg.getBoundingClientRect().height);
      copy.setAttribute('fill',style.fill);copy.setAttribute('stroke',style.stroke);copy.setAttribute('stroke-width',style.strokeWidth);
      const image=new Image();
      await new Promise(resolve=>{image.onload=resolve;image.onerror=resolve;image.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(new XMLSerializer().serializeToString(copy));});
      if(image.naturalWidth)svgImages.set(svg,image);
    }
    function drawText(node) {
      const style=getComputedStyle(node.parentElement),size=parseFloat(style.fontSize);
      if(!size)return;
      ctx.save();ctx.fillStyle=style.color;
      ctx.font=`${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      ctx.textBaseline='alphabetic';ctx.textAlign='left';
      const metrics=ctx.measureText('國Mg');
      const ascent=metrics.fontBoundingBoxAscent ?? size*.85,descent=metrics.fontBoundingBoxDescent ?? size*.2;
      const segments=typeof Intl.Segmenter==='function'?[...new Intl.Segmenter(undefined,{granularity:'grapheme'}).segment(node.textContent)].map(s=>({text:s.segment,index:s.index})):Array.from(node.textContent).reduce((out,text)=>{out.push({text,index:out.length?out.at(-1).index+out.at(-1).text.length:0});return out;},[]);
      const range=document.createRange();
      for(const {text,index} of segments){
        if(!text.trim())continue;
        range.setStart(node,index);range.setEnd(node,index+text.length);
        const r=range.getBoundingClientRect();if(!r.width||!r.height)continue;
        const baseline=r.top-bounds.top+(r.height-ascent-descent)/2+ascent;
        if(node.parentElement.closest('.arrival-copy h1')) {
          ctx.save();ctx.strokeStyle='rgba(0,0,0,.85)';ctx.lineWidth=.7;
          ctx.shadowColor='rgba(0,0,0,.95)';ctx.shadowBlur=5;ctx.shadowOffsetY=2;
          ctx.strokeText(text,r.left-bounds.left,baseline);
          ctx.fillText(text,r.left-bounds.left,baseline);ctx.restore();
        } else ctx.fillText(text,r.left-bounds.left,baseline);
      }
      range.detach?.();ctx.restore();
    }
    function paint(element) {
      const style=getComputedStyle(element);
      if(element.hidden||style.display==='none'||style.visibility==='hidden'||Number(style.opacity)===0)return;
      if(element.matches('.station-scene,.station-shade'))return;
      ctx.save();ctx.globalAlpha*=Number(style.opacity)||1;background(element);
      if(element.tagName.toLowerCase()==='svg'){
        const image=svgImages.get(element),b=box(element);if(image)ctx.drawImage(image,b.x,b.y,b.w,b.h);
      }else for(const node of element.childNodes){
        if(node.nodeType===3)drawText(node);else if(node.nodeType===1)paint(node);
      }
      ctx.restore();
    }
    for(const child of page.children)paint(child);
    const blob=await new Promise((resolve,reject)=>{
      try {canvas.toBlob(result=>result?resolve(result):reject(new Error('圖片產生失敗，請再試一次。')),'image/png');}
      catch(error){reject(new Error('背景圖片無法匯出，請確認車站圖片放在此網站同層的 img 資料夾。'));}
    });
    return blob;
  } finally {
    holder.remove();if(canvas){canvas.width=1;canvas.height=1;}
  }
}
let endingExportURL=null;
function clearEndingExport() {
  if(endingExportURL){URL.revokeObjectURL(endingExportURL);endingExportURL=null;}
}
async function downloadEnding() {
  if(!selectedEnding)return;
  const ending=selectedEnding,token=++downloadToken;
  const button=document.getElementById('saveEndingBtn');
  button.disabled=true;
  clearEndingExport();
  try {
    const blob=await captureEndingPage();
    if(token!==downloadToken)return;
    const name=`${ending.id}-${progress.givenName||'結局'}`.replace(/[\\/:*?"<>|\u0000-\u001f]/g,'_')+'.png';
    endingExportURL=URL.createObjectURL(blob);
    const file=new File([blob],name,{type:'image/png'});
    if(navigator.canShare?.({files:[file]})&&navigator.share){
      try {
        await navigator.share({files:[file],title:ending.title});
        return;
      }catch(error){if(error.name==='AbortError')return;}
    }
    if(token!==downloadToken)return;
    const link=document.createElement('a');link.href=endingExportURL;link.download=name;
    document.body.append(link);link.click();link.remove();
  }catch(error){
    if(token===downloadToken)ask('無法儲存圖片',error.message||'圖片產生失敗，請再試一次。',null,false);
  }finally{if(token===downloadToken)button.disabled=false;}
}

function boot() {
  startEscapeTimer();
  if(progress.completed===3)showStation();
  else goToStage(progress.completed+1);
}
boot();
