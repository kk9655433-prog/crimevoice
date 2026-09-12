"use strict";
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
  const COLS = 8;
  const ROWS = 7;

  const COLORS = {
    Y: "#efe84a",
    R: "#ff1d1d",
    P: "#a100ff",
    O: "#ff7a1f",
    G: "#7dff14",
    K: "#8fd8ff",
    M: "#f28ad3"
  };

  const PAIRS = [
    { id:"Y", a:[0,0], b:[2,4] },
    { id:"R", a:[3,0], b:[6,5] },
    { id:"P", a:[6,0], b:[7,3] },
    { id:"O", a:[7,0], b:[6,1] },
    { id:"G", a:[0,1], b:[4,6] },
    { id:"K", a:[5,3], b:[5,6] },
    { id:"M", a:[0,3], b:[3,6] }
  ];

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

      for (let i = 1; i < full.length - 1; i++) {
        const k = key(full[i].x, full[i].y);
        if (occupied.has(k)) return false;
        occupied.add(k);
      }
    }

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
    grad.addColorStop(0, "#58715f");
    grad.addColorStop(0.18, "#87a087");
    grad.addColorStop(0.34, "#4d6a55");
    grad.addColorStop(0.52, "#8aa38c");
    grad.addColorStop(0.7, "#47634f");
    grad.addColorStop(1, "#2f4a37");

    ctx.fillStyle = grad;
    roundedRect(boardX - 8, boardY - 8, boardW + 16, boardH + 16, 10);
    ctx.fill();

    ctx.fillStyle = "#015617";
    roundedRect(boardX - 2, boardY - 2, boardW + 4, boardH + 4, 6);
    ctx.fill();
  }

  function drawGrid(boardX, boardY, boardW, boardH, size) {
    ctx.fillStyle = "#015617";
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
    const outerR = size * 0.24;
    const innerR = size * 0.16;

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
    ['red','紅','#ed6670'],['orange','橙','#f2a35d'],['blue','藍','#69b1ee'],
    ['purple','紫','#b397ed'],['pink','粉','#eda3ce'],['yellow','黃','#e8cf6b'],['gray','灰','#b8c5d0']
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
  const tints=['#ad93e5','#7dcbe5','#d9c4a3','#a1bbd4','#cf9dd9'];
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
    vent.hidden=true;vent.classList.remove('opened');plates.hidden=false;
    document.getElementById('retryScrews').disabled=false;
    document.getElementById('escapeLight').classList.remove('expand');
    settle();render();
    status.textContent='拆下露出的螺絲；被板件壓住的螺絲暫時無法轉動。';
  }
  function svgElement(name,attributes={}) {
    const element=document.createElementNS(NS,name);
    Object.entries(attributes).forEach(([key,value])=>element.setAttribute(key,String(value)));
    return element;
  }
  function drawPieces() {
    const svg=svgElement('svg',{viewBox:'-24 -20 464 610',class:'screw-scene','aria-label':'交疊的透明板件與螺絲'});
    const defs=svgElement('defs');
    pieces.forEach(piece=>{
      const gradient=svgElement('linearGradient',{id:`glass-${piece.z}`,x1:'0',y1:'0',x2:'1',y2:'1'});
      [['0','#ffffff',.48],['.25',piece.tint,.73],['.78',piece.tint,.50],['1','#f3ecff',.72]].forEach(([offset,color,opacity])=>gradient.append(svgElement('stop',{offset,'stop-color':color,'stop-opacity':opacity})));
      defs.append(gradient);
    });svg.append(defs);
    for(const piece of pieces) {
      if(piece.screws.every(s=>s.removed))continue;
      const group=svgElement('g',{'data-piece':piece.z,class:'glass-piece'});
      const points=piece.polygon.map(p=>p.join(',')).join(' ');
      group.append(svgElement('polygon',{points,fill:'#020d19','fill-opacity':'.22',transform:'translate(0 5)'}));
      group.append(svgElement('polygon',{points,fill:`url(#glass-${piece.z})`,stroke:'#e8f0ff','stroke-opacity':'.82','stroke-width':'2.2','stroke-linejoin':'round',class:'glass-face'}));
      for(const screw of piece.screws) {
        if(screw.removed){group.append(svgElement('circle',{cx:screw.x,cy:screw.y,r:11,fill:'#112234','fill-opacity':'.42',stroke:'#f0f7ff','stroke-opacity':'.3','stroke-width':2}));continue;}
        const open=accessible(screw);
        const button=svgElement('g',{transform:`translate(${screw.x} ${screw.y})`,class:'real-screw'+(open?' exposed':' covered'),'data-order':screw.order,role:'button',tabindex:open?0:-1,'aria-disabled':!open,'aria-label':`${palette[screw.color].name}色螺絲${open?'':'，被板件壓住'}`});
        button.append(svgElement('circle',{r:25,fill:'transparent',class:'screw-hit'}));
        button.append(svgElement('circle',{cy:3,r:20,fill:'#1c203e','fill-opacity':'.5'}));
        button.append(svgElement('circle',{r:19,fill:palette[screw.color].hex,stroke:'#fff','stroke-opacity':'.6','stroke-width':1.5}));
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
  function openVent() {
    plates.hidden=true;vent.hidden=false;
    status.textContent='板件已全部拆除，現在可以打開通風口。';
    const container=document.getElementById('ventScrews');container.replaceChildren();
    for(let i=0;i<4;i++) {
      const button=document.createElement('button');button.className=`vent-screw v${i}`;button.textContent='＋';button.setAttribute('aria-label',`出口螺絲 ${i+1}`);
      button.addEventListener('click',()=>{
        if(button.disabled||complete)return;
        button.disabled=true;button.classList.add('removed');ventRemaining--;
        if(!ventRemaining) {
          complete=true;vent.classList.add('opened');
          document.getElementById('retryScrews').disabled=true;
          setTimeout(()=>document.getElementById('escapeLight').classList.add('expand'),450);
          setTimeout(()=>ask('你逃出來了','隨著拿掉最後一顆螺絲，\n你終於見到了太陽……',()=>{
            document.getElementById('stageCount').textContent='已完成';
            document.getElementById('stageHint').textContent='通風出口已開啟。';
            document.getElementById('helpBtn').hidden=true;
            status.textContent='你已成功離開通風管。';
          },false),1500);
        }
      });container.append(button);
    }
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

goToStage(1);
