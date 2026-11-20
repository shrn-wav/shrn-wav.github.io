/* =====================================================================
   CRATE CHASE — a $H₹N maze game. © $H₹N. All rights reserved.
   You are the spinning $H₹N record. Collect every spark, grab a mini
   cassette to flip the chase, and dodge the orange feedback glitches.
   Opens in a side panel so the tape keeps playing while you play.
   ===================================================================== */
(() => {
  const MAZE = [
    '###################',
    '#........#........#',
    '#o##.###.#.###.##o#',
    '#.................#',
    '#.##.#.#####.#.##.#',
    '#....#...#...#....#',
    '####.### # ###.####',
    '   #.#   E   #.#   ',
    '####.# ##-## #.####',
    '    .  #EEE#  .    ',
    '####.# ##### #.####',
    '   #.#       #.#   ',
    '####.# ##### #.####',
    '#........#........#',
    '#.##.###.#.###.##.#',
    '#o.#.....P.....#.o#',
    '##.#.#.#####.#.#.##',
    '#....#...#...#....#',
    '#.######.#.######.#',
    '#.................#',
    '###################',
  ];
  const COLS = 19, ROWS = MAZE.length, ACID = '#D1FA1D', HOT = '#ff7a3b';
  const DIRS = {up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0]};
  const best = () => { try { return +localStorage.getItem('crateChaseBest') || 0; } catch (_) { return 0; } };
  const saveBest = v => { try { localStorage.setItem('crateChaseBest', v); } catch (_) {} };
  const BEAT = n => (typeof beatAt === 'function' ? beatAt(n) : 0);
  const BPM = () => (typeof MUSIC !== 'undefined' && MUSIC.on ? MUSIC.bpm : 120);

  /* ---------- tiny synth for game sounds ---------- */
  let ac = null;
  const ctx = () => { try { ac = ac || new (window.AudioContext || window.webkitAudioContext)(); if (ac.state === 'suspended') ac.resume(); return ac; } catch (_) { return null; } };
  function blip(f1, f2, dur, type = 'square', vol = .05) {
    const a = ctx(); if (!a) return; const t = a.currentTime, o = a.createOscillator(), g = a.createGain();
    o.type = type; o.frequency.setValueAtTime(f1, t); o.frequency.exponentialRampToValueAtTime(Math.max(20, f2), t + dur);
    g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(.0001, t + dur);
    o.connect(g); g.connect(a.destination); o.start(t); o.stop(t + dur + .02);
  }

  /* ---------- panel ---------- */
  const panel = document.createElement('aside');
  panel.id = 'arcade'; panel.setAttribute('aria-label', 'Crate Chase game'); panel.setAttribute('aria-hidden', 'true');
  panel.innerHTML =
    '<div class="ar-head"><div><b>Crate Chase</b><span id="arNow">— no tape playing —</span></div><button class="ar-x" id="arX" aria-label="Close game">✕</button></div>' +
    '<div class="ar-hud"><span>SCORE <b id="arScore">0</b></span><span>BEST <b id="arBest">0</b></span><span>LVL <b id="arLvl">1</b></span><span id="arLives"></span></div>' +
    '<div class="ar-stage"><canvas id="arCv" aria-label="Game board"></canvas><div class="ar-msg" id="arMsg"></div></div>' +
    '<div class="ar-pad" aria-label="Controls"><button data-d="up" aria-label="Up">▲</button><button data-d="left" aria-label="Left">◀</button><button data-d="down" aria-label="Down">▼</button><button data-d="right" aria-label="Right">▶</button></div>' +
    '<p class="ar-help">ARROWS / WASD · SWIPE ON PHONE · P = PAUSE · collect every ✦, grab a ▭ cassette to turn the chase</p>';
  document.body.appendChild(panel);
  const cv = panel.querySelector('#arCv'), g = cv.getContext('2d'), msg = panel.querySelector('#arMsg');
  const icon = new Image(); icon.src = 'assets/brand/shrn-icon.svg';

  let T = 20, W = 0, H = 0, grid, dots, player, foes, score, lives, level, state = 'idle', frightT = 0, raf = 0, last = 0, startedAt = 0, open = false;

  const tileAt = (x, y) => { if (y < 0 || y >= ROWS) return '#'; x = (x + COLS) % COLS; return grid[y][x]; };
  const walk = (x, y, foe) => { const c = tileAt(x, y); return c !== '#' && (foe || c !== '-'); };

  function reset(full) {
    if (full) { score = 0; lives = 3; level = 1; }
    grid = MAZE.map(r => r.split(''));
    dots = 0;
    const homes = [];
    grid.forEach((row, y) => row.forEach((c, x) => {
      if (c === '.' || c === 'o') dots++;
      if (c === 'P') { player = {x, y, d: [0, 0], want: [0, 0], p: 0, a: 0}; grid[y][x] = ' '; }
      if (c === 'E') { homes.push([x, y]); grid[y][x] = ' '; }
    }));
    const order = [[9, 7], [8, 9], [9, 9], [10, 9]];
    foes = order.map(([x, y], i) => ({x, y, hx: x, hy: y, d: [0, -1], p: 0, mode: i === 0 ? 'chase' : 'wait', wait: i * 2.2, kind: i, dead: 0}));
    frightT = 0;
  }
  function placeAfterHit() {
    player.x = 9; player.y = 15; player.d = [0, 0]; player.want = [0, 0]; player.p = 0;
    foes.forEach((f, i) => { const o = [[9, 7], [8, 9], [9, 9], [10, 9]][i]; f.x = o[0]; f.y = o[1]; f.p = 0; f.d = [0, -1]; f.mode = i === 0 ? 'chase' : 'wait'; f.wait = i * 2.2; f.dead = 0; });
    frightT = 0;
  }

  function size() {
    const st = panel.querySelector('.ar-stage'), r = st.getBoundingClientRect();
    T = Math.max(10, Math.floor(Math.min(r.width / COLS, r.height / ROWS)));
    W = T * COLS; H = T * ROWS;
    const dpr = Math.min(2, devicePixelRatio || 1);
    cv.width = W * dpr; cv.height = H * dpr; cv.style.width = W + 'px'; cv.style.height = H + 'px';
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  /* ---------- movement ---------- */
  function stepEntity(e, speed, dt, foe) {
    if (e.p === 0 && !walk(e.x + e.d[0], e.y + e.d[1], foe)) { foe ? chooseFoeDir(e) : choosePlayerDir(e); if (!e.d[0] && !e.d[1]) return; }
    e.p += speed * dt;
    while (e.p >= 1) {
      e.p -= 1; e.x = (e.x + e.d[0] + COLS) % COLS; e.y += e.d[1];
      if (foe) chooseFoeDir(e); else choosePlayerDir(e);
      if (e.d[0] === 0 && e.d[1] === 0) { e.p = 0; break; }
    }
  }
  function choosePlayerDir(e) {
    if ((e.want[0] || e.want[1]) && walk(e.x + e.want[0], e.y + e.want[1])) e.d = e.want.slice();
    else if (!walk(e.x + e.d[0], e.y + e.d[1])) e.d = [0, 0];
    eat(e.x, e.y);
  }
  function targetFor(f) {
    const p = player;
    if (f.dead) return [9, 7];
    if (f.kind === 0) return [p.x, p.y];
    if (f.kind === 1) return [p.x + p.d[0] * 4, p.y + p.d[1] * 4];
    if (f.kind === 2) return Math.hypot(f.x - p.x, f.y - p.y) > 6 ? [p.x, p.y] : [1, 19];
    return [(p.x + (Date.now() >> 11) % 7) % COLS, p.y];
  }
  function chooseFoeDir(f) {
    if (f.dead && f.x === 9 && f.y === 7) { f.dead = 0; f.mode = 'chase'; }
    const opts = Object.values(DIRS).filter(([dx, dy]) => !(dx === -f.d[0] && dy === -f.d[1]) && walk(f.x + dx, f.y + dy, true) && !(tileAt(f.x + dx, f.y + dy) === '-' && dy > 0 && !f.dead));
    if (!opts.length) { f.d = [-f.d[0], -f.d[1]]; return; }
    if (frightT > 0 && !f.dead) { f.d = opts[Math.floor(Math.random() * opts.length)]; return; }
    const [tx, ty] = targetFor(f);
    opts.sort((a, b) => Math.hypot(f.x + a[0] - tx, f.y + a[1] - ty) - Math.hypot(f.x + b[0] - tx, f.y + b[1] - ty));
    f.d = opts[0];
  }
  function eat(x, y) {
    const c = grid[y][x];
    if (c === '.') { grid[y][x] = ' '; dots--; score += 10; if (score % 50 === 0) blip(900, 1200, .05, 'square', .025); }
    if (c === 'o') { grid[y][x] = ' '; dots--; score += 50; frightT = Math.max(3.5, 8 - level * .8); blip(200, 1400, .35, 'sawtooth', .05); foes.forEach(f => { if (!f.dead && f.mode !== 'wait') f.d = [-f.d[0], -f.d[1]]; }); }
    if (dots <= 0) { level++; state = 'clear'; showMsg('LEVEL ' + (level - 1) + ' CLEARED', 'tap / any key for level ' + level); blip(400, 1600, .5, 'triangle', .06); }
    hud();
  }

  /* ---------- loop ---------- */
  function update(dt) {
    const tempo = BPM() / 120;
    const ps = 6.2 * (.95 + .05 * tempo);
    if (player.d[0] || player.d[1] || player.want[0] || player.want[1]) {
      if (!player.d[0] && !player.d[1]) choosePlayerDir(player);
      if ((player.want[0] === -player.d[0] && player.want[1] === -player.d[1]) && (player.d[0] || player.d[1])) {
        player.x = (player.x + player.d[0] + COLS) % COLS; player.y += player.d[1]; player.p = 1 - player.p; player.d = player.want.slice();
      }
      stepEntity(player, ps, dt, false);
    }
    player.a += dt * (player.d[0] || player.d[1] ? 9 : 2);
    if (frightT > 0) frightT = Math.max(0, frightT - dt);
    const fs = (4.6 + level * .35) * (.9 + .1 * tempo);
    for (const f of foes) {
      if (f.mode === 'wait') { f.wait -= dt; if (f.wait <= 0) { f.mode = 'chase'; f.x = 9; f.y = 7; f.p = 0; f.d = [-1, 0]; } continue; }
      stepEntity(f, f.dead ? 11 : frightT > 0 ? 3.2 : fs, dt, true);
      const fx = f.x + f.d[0] * f.p, fy = f.y + f.d[1] * f.p, px = player.x + player.d[0] * player.p, py = player.y + player.d[1] * player.p;
      if (!f.dead && Math.abs(fx - px) + Math.abs(fy - py) < .7) {
        if (frightT > 0) { f.dead = 1; score += 200; blip(1200, 80, .4, 'sawtooth', .06); hud(); }
        else { lives--; blip(600, 40, .8, 'triangle', .07); hud(); if (lives <= 0) { state = 'over'; const b = Math.max(best(), score); saveBest(b); hud(); showMsg('GAME OVER', 'score ' + score + ' · tap / any key to run it back'); } else { placeAfterHit(); state = 'ready'; showMsg('OUCH', 'tap / any key to keep going'); } return; }
      }
    }
  }
  function draw(now) {
    const b = BEAT(now);
    g.clearRect(0, 0, W, H);
    g.fillStyle = '#050505'; g.fillRect(0, 0, W, H);
    /* walls: lime outlines only where a wall meets open floor */
    g.strokeStyle = 'rgba(209,250,29,' + (.55 + b * .3).toFixed(2) + ')'; g.lineWidth = Math.max(1.5, T * .1); g.lineCap = 'round';
    g.beginPath();
    for (let y = 0; y < ROWS; y++) for (let x = 0; x < COLS; x++) {
      if (MAZE[y][x] !== '#') continue;
      const X = x * T, Y = y * T, open = (dx, dy) => { const c = (MAZE[y + dy] || '')[x + dx]; return c !== undefined && c !== '#'; };
      if (open(0, -1)) { g.moveTo(X + 2, Y + 2); g.lineTo(X + T - 2, Y + 2); }
      if (open(0, 1)) { g.moveTo(X + 2, Y + T - 2); g.lineTo(X + T - 2, Y + T - 2); }
      if (open(-1, 0)) { g.moveTo(X + 2, Y + 2); g.lineTo(X + 2, Y + T - 2); }
      if (open(1, 0)) { g.moveTo(X + T - 2, Y + 2); g.lineTo(X + T - 2, Y + T - 2); }
    }
    g.stroke();
    /* door */
    g.fillStyle = HOT; g.fillRect(9 * T + 2, 8 * T + T / 2 - 1, T - 4, 2);
    /* sparks + cassettes */
    for (let y = 0; y < ROWS; y++) for (let x = 0; x < COLS; x++) {
      const c = grid[y][x], cx = x * T + T / 2, cy = y * T + T / 2;
      if (c === '.') { const r = T * (.09 + b * .04); g.fillStyle = ACID; g.beginPath(); g.moveTo(cx, cy - r * 2); g.lineTo(cx + r * .6, cy - r * .6); g.lineTo(cx + r * 2, cy); g.lineTo(cx + r * .6, cy + r * .6); g.lineTo(cx, cy + r * 2); g.lineTo(cx - r * .6, cy + r * .6); g.lineTo(cx - r * 2, cy); g.lineTo(cx - r * .6, cy - r * .6); g.fill(); }
      if (c === 'o') { const w = T * .8, h = T * .52, s = 1 + b * .15; g.save(); g.translate(cx, cy); g.scale(s, s); g.fillStyle = ACID; g.fillRect(-w / 2, -h / 2, w, h); g.fillStyle = '#050505'; g.beginPath(); g.arc(-w * .2, h * .08, h * .17, 0, 7); g.arc(w * .2, h * .08, h * .17, 0, 7); g.fill(); g.restore(); }
    }
    /* foes: orange feedback glitches */
    for (const f of foes) {
      const x = (f.x + f.d[0] * f.p) * T + T / 2, y = (f.y + f.d[1] * f.p) * T + T / 2, s = T * .42, t = now / 120;
      if (f.mode === 'wait' && f.x === 9 && f.y === 7) continue;
      const scared = frightT > 0 && !f.dead, flash = scared && frightT < 1.6 && Math.floor(now / 150) % 2;
      if (f.dead) { g.strokeStyle = 'rgba(209,250,29,.5)'; g.lineWidth = 1.5; g.strokeRect(x - s * .5, y - s * .3, s, s * .6); continue; }
      g.fillStyle = scared ? (flash ? '#e2e5d6' : '#3a4a10') : HOT;
      g.beginPath(); g.moveTo(x - s, y + s);
      for (let i = 0; i <= 6; i++) { const px = x - s + (2 * s) * i / 6; g.lineTo(px, y + s - (i % 2 ? s * .35 : 0) - Math.sin(t + i) * s * .08); }
      g.lineTo(x + s, y - s * .2); g.quadraticCurveTo(x + s, y - s, x, y - s); g.quadraticCurveTo(x - s, y - s, x - s, y - s * .2); g.closePath(); g.fill();
      /* square-wave visor */
      g.strokeStyle = scared ? ACID : '#050505'; g.lineWidth = Math.max(1.5, T * .08); g.beginPath();
      const vy = y - s * .2; g.moveTo(x - s * .6, vy); g.lineTo(x - s * .3, vy); g.lineTo(x - s * .3, vy - s * .25); g.lineTo(x, vy - s * .25); g.lineTo(x, vy); g.lineTo(x + s * .3, vy); g.lineTo(x + s * .3, vy - s * .25); g.lineTo(x + s * .6, vy - s * .25); g.stroke();
    }
    /* player: the spinning $H₹N record */
    const px = (player.x + player.d[0] * player.p) * T + T / 2, py = (player.y + player.d[1] * player.p) * T + T / 2, r = T * .46;
    g.beginPath(); g.arc(px, py, r, 0, 7); g.fillStyle = '#050505'; g.fill(); g.lineWidth = Math.max(1.5, T * .1); g.strokeStyle = ACID; g.stroke();
    if (icon.naturalWidth) { const w = r * 1.35, h = w * icon.naturalHeight / icon.naturalWidth; g.save(); g.translate(px, py); g.rotate(player.a); g.drawImage(icon, -w / 2, -h / 2, w, h); g.restore(); }
  }
  function loop(now) {
    raf = requestAnimationFrame(loop);
    const dt = Math.min(.05, (now - last) / 1000); last = now;
    if (state === 'play') update(dt);
    draw(now);
  }

  /* ---------- ui ---------- */
  function hud() {
    panel.querySelector('#arScore').textContent = score;
    panel.querySelector('#arBest').textContent = Math.max(best(), score);
    panel.querySelector('#arLvl').textContent = level;
    panel.querySelector('#arLives').innerHTML = '♥'.repeat(Math.max(0, lives));
  }
  function showMsg(a, b) { msg.innerHTML = '<b>' + a + '</b><span>' + b + '</span>'; msg.hidden = false; }
  function go() {
    if (state === 'over' || state === 'idle') { reset(true); }
    else if (state === 'clear') { const s = score, l = lives, lv = level; reset(false); score = s; lives = l; level = lv; }
    msg.hidden = true; state = 'play'; hud(); ctx();
  }
  function steer(name) {
    const d = DIRS[name]; if (!d) return;
    if (state !== 'play') { go(); }
    player.want = d.slice();
    if (!player.d[0] && !player.d[1] && walk(player.x + d[0], player.y + d[1])) player.d = d.slice();
  }
  const KEYS = {ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right', w: 'up', s: 'down', a: 'left', d: 'right', W: 'up', S: 'down', A: 'left', D: 'right'};
  addEventListener('keydown', e => {
    if (!open) return;
    if (e.key === 'Escape') { close(); return; }
    if (e.key === 'p' || e.key === 'P') { if (state === 'play') { state = 'paused'; showMsg('PAUSED', 'p or tap to resume'); } else if (state === 'paused') { state = 'play'; msg.hidden = true; } return; }
    if (KEYS[e.key]) { e.preventDefault(); steer(KEYS[e.key]); return; }
    if (state !== 'play' && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); go(); }
  });
  panel.querySelector('.ar-pad').addEventListener('pointerdown', e => { const b = e.target.closest('[data-d]'); if (b) { e.preventDefault(); steer(b.dataset.d); } });
  let sw = null;
  cv.addEventListener('pointerdown', e => { sw = {x: e.clientX, y: e.clientY}; if (state !== 'play' && state !== 'paused') go(); else if (state === 'paused') { state = 'play'; msg.hidden = true; } });
  cv.addEventListener('pointermove', e => { if (!sw) return; const dx = e.clientX - sw.x, dy = e.clientY - sw.y; if (Math.max(Math.abs(dx), Math.abs(dy)) > 18) { steer(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up')); sw = {x: e.clientX, y: e.clientY}; } });
  addEventListener('pointerup', () => { sw = null; });
  msg.addEventListener('pointerdown', () => { if (state === 'paused') { state = 'play'; msg.hidden = true; } else go(); });
  panel.querySelector('#arX').addEventListener('click', () => close());
  addEventListener('resize', () => { if (open) size(); });

  function openGame() {
    if (open) return;
    open = true; panel.classList.add('on'); panel.setAttribute('aria-hidden', 'false'); document.body.classList.add('arcade-on');
    const np = document.getElementById('npTitle'); panel.querySelector('#arNow').textContent = (typeof MUSIC !== 'undefined' && MUSIC.on && np && np.textContent && np.textContent !== '—') ? '▶ ' + np.textContent : '— no tape playing · load one for the full vibe —';
    requestAnimationFrame(() => { size(); if (state === 'idle') { reset(true); hud(); showMsg('CRATE CHASE', 'collect every ✦ · grab a cassette to flip the chase · tap or press any arrow to start'); } last = performance.now(); cancelAnimationFrame(raf); raf = requestAnimationFrame(loop); });
  }
  function close() {
    if (!open) return;
    open = false; panel.classList.remove('on'); panel.setAttribute('aria-hidden', 'true'); document.body.classList.remove('arcade-on');
    if (state === 'play') { state = 'paused'; showMsg('PAUSED', 'tap to resume'); }
    cancelAnimationFrame(raf);
  }
  window.CrateChase = {open: openGame, close, get isOpen() { return open; }};
})();
