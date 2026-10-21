// bc19 replica replay viewer (tools/galaxy19/viewer). Loads a match archive (ZIP of game-NN-seed<seed>.bc19 replays +
// match.json, as the replica's saturn writes it) or a single .bc19 replay and shows the chosen game in the official
// 2019 visualizer (visualizer-official.js + pixi.min.js; the engine's game.js re-simulates the actions, no bot code runs).
// URL: visualizer.html?/storage/<bucket>/episode/<ep>/replays/<uuid>.bc19   (also ?gameSource=<same path>)
(function () {
  'use strict';
    var REASON = ['castles destroyed', 'health tiebreak', 'coin flip', 'init failure', 'both init failure'];
  var $ = function (id) { return document.getElementById(id); };
  var state = { games: [], cur: null, v: null, timer: null };

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

  // ------------------------------------------------------------------ the official visualizer
  // window.BC19Visualizer is the official 2019 Visualizer class (visualizer-official.js). It re-simulates the recorded
  // actions with the engine's Game (engine19.js) and draws with pixi.js; this page only feeds it one game at a time.
  function retire(v) {
    if (!v) return;
    if (v.running) v.startStop();
    v.draw = function () {};                     // ends its requestAnimationFrame loop
    try { v.renderer.destroy(true); } catch (e) { /* already gone */ }
  }

  function roundOf(v) { return v && v.game ? v.game.round : 0; }

  function showGame(i) {
    stop();
    var g = state.games[i];
    var rows = $('game-rows').children;
    for (var k = 0; k < rows.length; k++) rows[k].className = k === i ? 'sel' : '';
    status('Loading game ' + (i + 1) + '...');
    setTimeout(function () {
      try {
        retire(state.v);
        var h = header(g.data), m = g.meta || {};
        $('player').hidden = false;
        state.v = new window.BC19Visualizer('pixi', g.data, function (turn) {
          $('slider').value = String(turn);
          $('turn').textContent = 'turn ' + turn + ' / ' + h.turns + ', round ' + roundOf(state.v);
        });
        state.cur = { i: i, h: h, meta: m };
        var sl = $('slider'); sl.max = String(state.v.numTurns()); sl.value = '0';
        $('turn').textContent = 'turn 0 / ' + h.turns + ', round 0';
        $('title').textContent = 'Game ' + (i + 1) + ', ' + (m.map || 'seed-' + h.seed) + ': ' + (m.red_team || 'red') +
          ' (red) vs ' + (m.blue_team || 'blue') + ' (blue); winner ' + (m.winner_team ? m.winner_team + ' ' : '') +
          '(' + (h.winner === 0 ? 'red' : 'blue') + ', ' + (REASON[h.reason] || h.reason) + ')';
        status('Game ' + (i + 1) + ' of ' + state.games.length + ': ' + h.turns + ' robot-turns.');
      } catch (e) { status('Could not show the game: ' + e.message); }
    }, 10);
  }

  // ------------------------------------------------------------------ playback (page controls around the class)
  function go(turn) {
    var v = state.v; if (!v) return;
    turn = Math.max(0, Math.min(v.numTurns(), turn));
    // the class fills its 1000-turn checkpoints in the background; until the one needed exists, step forward instead
    if (v.checkpoints[Math.floor(turn / 1000)] || turn < v.turn) v.goToTurn(turn);
    else while (v.turn < turn) v.nextTurn();
    $('slider').value = String(turn);
    $('turn').textContent = 'turn ' + turn + ' / ' + v.numTurns() + ', round ' + roundOf(v);
  }
  function stepRound(dir) {
    var v = state.v; if (!v) return;
    var r = roundOf(v) + dir;
    if (dir > 0) { while (v.turn < v.numTurns() && roundOf(v) < r) v.nextTurn(); go(v.turn); }
    else if (r >= 0) { v.goToRound(r); go(v.turn); }
  }
  function stop() { if (state.timer) { clearInterval(state.timer); state.timer = null; } $('play').textContent = 'Play'; }
  function play() {
    if (state.timer) return stop();
    var v = state.v; if (!v) return;
    if (v.turn >= v.numTurns()) go(0);
    $('play').textContent = 'Pause';
    state.timer = setInterval(function () {
      if (!state.v || state.v.turn >= state.v.numTurns()) return stop();
      go(state.v.turn + Number($('speed').value));
    }, 33);
  }

  $('play').addEventListener('click', play);
  $('back').addEventListener('click', function () { stop(); stepRound(-1); });
  $('fwd').addEventListener('click', function () { stop(); stepRound(1); });
  $('slider').addEventListener('input', function () { stop(); go(Number(this.value)); });
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
