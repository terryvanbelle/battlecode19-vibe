// bc19 replica replay viewer (tools/galaxy19/viewer). Loads a match archive (ZIP of game-NN-seed<seed>.bc19 replays +
// match.json, as the replica's saturn writes it) or a single .bc19 replay, re-simulates the chosen game with the
// pinned engine (engine19.js: bc19 game.js; no bot code runs) and draws it on a canvas.
// URL: visualizer.html?/storage/<bucket>/episode/<ep>/replays/<uuid>.bc19   (also ?gameSource=<same path>)
(function () {
  'use strict';
  var E = window.BC19Engine;
  var UNIT = ['C', 'H', 'p', 'c', 'P', 'X'];
  var UNIT_NAME = ['castle', 'church', 'pilgrim', 'crusader', 'prophet', 'preacher'];
  var REASON = ['castles destroyed', 'health tiebreak', 'coin flip', 'init failure', 'both init failure'];
  var $ = function (id) { return document.getElementById(id); };
  var state = { games: [], cur: null, frames: [], idx: 0, timer: null };

  function status(t) { $('status').textContent = t; }

  // ------------------------------------------------------------------ input
  function replayPathFromQuery() {
    var q = window.location.search.replace(/^\?/, '');
    if (!q) return null;
    var m = /(?:^|&)gameSource=([^&]*)/.exec(q);
    var p = decodeURIComponent(m ? m[1] : q);
    try { var u = new URL(p, window.location.href); if (u.origin === window.location.origin) p = u.pathname; else return null; }
    catch (e) { return null; }
    if (!/^\/storage\/[A-Za-z0-9._-]+\/[A-Za-z0-9._\/-]+$/.test(p) || p.indexOf('..') >= 0) return null;
    return p;
  }

  function u32(b, o) { return (b[o] | (b[o + 1] << 8) | (b[o + 2] << 16) | (b[o + 3] << 24)) >>> 0; }
  function u16(b, o) { return b[o] | (b[o + 1] << 8); }

  function inflateRaw(bytes) {
    if (typeof DecompressionStream === 'undefined') return Promise.reject(new Error('this browser cannot inflate'));
    var s = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('deflate-raw'));
    return new Response(s).arrayBuffer().then(function (ab) { return new Uint8Array(ab); });
  }

  // Minimal ZIP reader (central directory; stored or deflated entries).
  function readZip(b) {
    var eocd = -1;
    for (var i = b.length - 22; i >= Math.max(0, b.length - 65557); i--) if (u32(b, i) === 0x06054b50) { eocd = i; break; }
    if (eocd < 0) return Promise.reject(new Error('not a zip archive'));
    var n = u16(b, eocd + 10), off = u32(b, eocd + 16), out = [];
    for (var k = 0; k < n; k++) {
      if (u32(b, off) !== 0x02014b50) return Promise.reject(new Error('bad central directory'));
      var method = u16(b, off + 10), csize = u32(b, off + 20), nlen = u16(b, off + 28), elen = u16(b, off + 30),
        clen = u16(b, off + 32), loff = u32(b, off + 42);
      var name = new TextDecoder().decode(b.subarray(off + 46, off + 46 + nlen));
      var data0 = loff + 30 + u16(b, loff + 26) + u16(b, loff + 28);
      out.push({ name: name, method: method, raw: b.subarray(data0, data0 + csize) });
      off += 46 + nlen + elen + clen;
    }
    return Promise.all(out.map(function (e) {
      if (e.method === 0) return Promise.resolve([e.name, e.raw]);
      if (e.method === 8) return inflateRaw(e.raw).then(function (d) { return [e.name, d]; });
      return Promise.reject(new Error('unsupported compression in ' + e.name));
    })).then(function (pairs) { var m = {}; pairs.forEach(function (p) { m[p[0]] = p[1]; }); return m; });
  }

  function header(buf) {
    if (buf.length < 6 || (buf.length - 6) % 8 !== 0) throw new Error('not a bc19 replay (length ' + buf.length + ')');
    return { winner: buf[0], reason: buf[1], seed: ((buf[2] << 24) | (buf[3] << 16) | (buf[4] << 8) | buf[5]) >>> 0, turns: (buf.length - 6) / 8 };
  }

  function load(bytes, label, downloadName) {
    var b = new Uint8Array(bytes);
    var link = $('dl-all');
    link.href = URL.createObjectURL(new Blob([b], { type: 'application/octet-stream' }));
    link.download = downloadName || 'replay';
    link.textContent = 'Download ' + (downloadName || 'replay');
    link.hidden = false;
    var isZip = b.length > 4 && u32(b, 0) === 0x04034b50;
    var p = isZip ? readZip(b) : Promise.resolve(null);
    return p.then(function (files) {
      var games = [];
      if (files) {
        var meta = null;
        if (files['match.json']) { try { meta = JSON.parse(new TextDecoder().decode(files['match.json'])); } catch (e) { meta = null; } }
        if (meta && meta.games) {
          meta.games.forEach(function (g) { if (files[g.file]) games.push({ name: g.file, data: files[g.file], meta: g }); });
        } else {
          Object.keys(files).sort().forEach(function (n) { if (/\.bc19$/.test(n)) games.push({ name: n, data: files[n], meta: null }); });
        }
      } else {
        games.push({ name: downloadName || 'game.bc19', data: b, meta: null });
      }
      if (!games.length) throw new Error('no .bc19 replay in this file');
      state.games = games;
      listGames();
      status(label + ': ' + games.length + ' game(s).');
      showGame(0);
    });
  }

  function listGames() {
    var tb = $('game-rows');
    tb.textContent = '';
    state.games.forEach(function (g, i) {
      var h = header(g.data), m = g.meta || {};
      var tr = document.createElement('tr');
      var cells = [String(i + 1), m.map || ('seed-' + h.seed), m.red_team || 'red', m.blue_team || 'blue',
        (m.winner_team ? m.winner_team + ' ' : '') + '(' + (h.winner === 0 ? 'red' : 'blue') + ')', REASON[h.reason] || String(h.reason),
        m.rounds != null ? String(m.rounds) : '?'];
      cells.forEach(function (c) { var td = document.createElement('td'); td.textContent = c; tr.appendChild(td); });
      var td1 = document.createElement('td'), btn = document.createElement('button');
      btn.type = 'button'; btn.textContent = 'Watch'; btn.addEventListener('click', function () { showGame(i); });
      td1.appendChild(btn); tr.appendChild(td1);
      var td2 = document.createElement('td'), a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([g.data], { type: 'application/octet-stream' }));
      a.download = g.name.replace(/^.*\//, ''); a.textContent = '.bc19';
      td2.appendChild(a); tr.appendChild(td2);
      tb.appendChild(tr);
    });
    $('games').hidden = false;
  }

  // ------------------------------------------------------------------ simulation
  function simulate(buf) {
    var h = header(buf);
    var g = new E.Game(h.seed, E.SPECS.CHESS_INITIAL, E.SPECS.CHESS_EXTRA, false, false);
    g.robotError = function () {}; g.robotLog = function () {};
    var frames = [];
    function snap() {
      var r = g.robots, a = new Int32Array(r.length * 6);
      for (var i = 0; i < r.length; i++) {
        var o = r[i]; a.set([o.id, o.team, o.unit, o.x, o.y, o.health], i * 6);
      }
      frames.push({ round: g.round, robots: a, k: g.karbonite.slice(), f: g.fuel.slice() });
    }
    snap();
    var lastRound = g.round;
    for (var i = 0; i < h.turns; i++) {
      g.enactTurn(buf.subarray(6 + 8 * i, 14 + 8 * i));
      if (g.round !== lastRound) {
        // the round advanced at the start of this turn: frames hold the board at the end of each round
        var cur = frames.pop(); frames.push(cur); lastRound = g.round;
      }
      if (i + 1 === h.turns || (g.robin + 1 >= g.robots.length)) {
        if (!frames.length || frames[frames.length - 1].round !== g.round || i + 1 === h.turns) {
          if (frames.length && frames[frames.length - 1].round === g.round) frames.pop();
          snap();
        }
      }
    }
    return { h: h, g: g, frames: frames };
  }

  function showGame(i) {
    stop();
    var g = state.games[i];
    status('Re-simulating game ' + (i + 1) + '...');
    var rows = $('game-rows').children;
    for (var k = 0; k < rows.length; k++) rows[k].className = k === i ? 'sel' : '';
    setTimeout(function () {
      try {
        var s = simulate(g.data);
        state.cur = { i: i, meta: g.meta || {}, sim: s };
        state.frames = s.frames;
        var sl = $('slider'); sl.max = String(s.frames.length - 1); sl.value = '0';
        state.idx = 0;
        $('player').hidden = false;
        setupCanvas(s.g);
        draw();
        status('Game ' + (i + 1) + ': ' + s.frames.length + ' frames, ' + s.h.turns + ' robot-turns.');
      } catch (e) { status('Could not simulate: ' + e.message); }
    }, 10);
  }

  // ------------------------------------------------------------------ drawing
  var cell = 10;
  function setupCanvas(g) {
    var w = g.map[0].length, hgt = g.map.length;
    cell = Math.max(4, Math.floor(704 / Math.max(w, hgt)));
    var c = $('board'); c.width = w * cell; c.height = hgt * cell;
  }

  function draw() {
    var cur = state.cur; if (!cur) return;
    var g = cur.sim.g, f = state.frames[state.idx], ctx = $('board').getContext('2d');
    var w = g.map[0].length, hgt = g.map.length;
    for (var y = 0; y < hgt; y++) for (var x = 0; x < w; x++) {
      ctx.fillStyle = !g.map[y][x] ? '#3a3a3f' : g.karbonite_map[y][x] ? '#46b35a' : g.fuel_map[y][x] ? '#e3c23b' : '#f2f2ee';
      ctx.fillRect(x * cell, y * cell, cell, cell);
    }
    var counts = [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]], hp = [0, 0];
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.font = 'bold ' + Math.max(7, cell - 2) + 'px system-ui, sans-serif';
    for (var i = 0; i < f.robots.length; i += 6) {
      var team = f.robots[i + 1], unit = f.robots[i + 2], rx = f.robots[i + 3], ry = f.robots[i + 4];
      counts[team][unit]++; hp[team] += f.robots[i + 5];
      ctx.fillStyle = team === 0 ? '#d33' : '#36f';
      if (unit <= 1) ctx.fillRect(rx * cell, ry * cell, cell, cell);
      else { ctx.beginPath(); ctx.arc(rx * cell + cell / 2, ry * cell + cell / 2, cell * 0.45, 0, 2 * Math.PI); ctx.fill(); }
      if (cell >= 8) { ctx.fillStyle = '#fff'; ctx.fillText(UNIT[unit], rx * cell + cell / 2, ry * cell + cell / 2 + 0.5); }
    }
    $('slider').value = String(state.idx);
    var last = state.idx === state.frames.length - 1, h = cur.sim.h, m = cur.meta;
    $('round').textContent = 'round ' + f.round + (last ? ' (end: ' + (h.winner === 0 ? 'red' : 'blue') + ' wins, ' + (REASON[h.reason] || h.reason) + ')' : '');
    $('title').textContent = (m.map || 'seed-' + h.seed) + ': ' + (m.red_team || 'red') + ' (red) vs ' + (m.blue_team || 'blue') + ' (blue)';
    var t = $('stats'); t.textContent = '';
    var rows = [['', 'red', 'blue']];
    UNIT_NAME.forEach(function (n, u) { rows.push([n, counts[0][u], counts[1][u]]); });
    rows.push(['karbonite', f.k[0], f.k[1]], ['fuel', f.f[0], f.f[1]], ['total HP', hp[0], hp[1]]);
    rows.forEach(function (r, ri) {
      var tr = document.createElement('tr');
      r.forEach(function (v, ci) {
        var td = document.createElement(ri === 0 ? 'th' : 'td'); td.textContent = String(v);
        if (ri === 0 && ci > 0) td.className = ci === 1 ? 'red' : 'blue';
        tr.appendChild(td);
      });
      t.appendChild(tr);
    });
  }

  function hover(ev) {
    var cur = state.cur; if (!cur) return;
    var c = $('board'), r = c.getBoundingClientRect();
    var x = Math.floor((ev.clientX - r.left) * c.width / r.width / cell), y = Math.floor((ev.clientY - r.top) * c.height / r.height / cell);
    var g = cur.sim.g; if (y < 0 || y >= g.map.length || x < 0 || x >= g.map[0].length) return;
    var f = state.frames[state.idx], s = '(' + x + ', ' + y + ') ' + (!g.map[y][x] ? 'impassable' : g.karbonite_map[y][x] ? 'karbonite' : g.fuel_map[y][x] ? 'fuel' : 'passable');
    for (var i = 0; i < f.robots.length; i += 6) if (f.robots[i + 3] === x && f.robots[i + 4] === y)
      s += '; robot ' + f.robots[i] + ' ' + (f.robots[i + 1] === 0 ? 'red' : 'blue') + ' ' + UNIT_NAME[f.robots[i + 2]] + ' HP ' + f.robots[i + 5];
    $('hover').textContent = s;
  }

  // ------------------------------------------------------------------ playback
  function stop() { if (state.timer) { clearInterval(state.timer); state.timer = null; } $('play').textContent = 'Play'; }
  function play() {
    if (state.timer) return stop();
    if (state.idx >= state.frames.length - 1) state.idx = 0;
    $('play').textContent = 'Pause';
    state.timer = setInterval(function () {
      if (state.idx >= state.frames.length - 1) return stop();
      state.idx++; draw();
    }, 1000 / Number($('speed').value));
  }

  $('play').addEventListener('click', play);
  $('back').addEventListener('click', function () { stop(); state.idx = Math.max(0, state.idx - 1); draw(); });
  $('fwd').addEventListener('click', function () { stop(); state.idx = Math.min(state.frames.length - 1, state.idx + 1); draw(); });
  $('slider').addEventListener('input', function () { stop(); state.idx = Number(this.value); draw(); });
  $('speed').addEventListener('change', function () { if (state.timer) { stop(); play(); } });
  $('board').addEventListener('mousemove', hover);
  $('file').addEventListener('change', function () {
    var f = this.files[0]; if (!f) return;
    f.arrayBuffer().then(function (ab) { return load(ab, f.name, f.name); }).catch(function (e) { status('Error: ' + e.message); });
  });

  var p = replayPathFromQuery();
  if (p) {
    status('Loading ' + p + ' ...');
    fetch(p, { credentials: 'same-origin' }).then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.arrayBuffer();
    }).then(function (ab) {
      var base = p.replace(/^.*\//, '').replace(/\.bc19$/, '');
      return load(ab, 'Match ' + base, 'match-' + base + '.zip');
    }).catch(function (e) { status('Could not load the replay: ' + e.message); });
  } else if (window.location.search) {
    status('Only replays stored on this site can be loaded (/storage/...).');
  }
})();
