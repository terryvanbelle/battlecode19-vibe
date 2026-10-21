'use strict';
// tools/progress/ (ratings, games.csv, attempts, replica views): the Python suite test/progress/test_progress.py, run
// with .venv-progress's python when it exists (so the charts render too), else the system python3.
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

test('progress: tools/progress python suite', () => {
  const venv = path.join(__dirname, '..', '.venv-progress', 'bin', 'python');
  const py = fs.existsSync(venv) ? venv : 'python3';
  const r = spawnSync(py, [path.join(__dirname, 'progress', 'test_progress.py')], { encoding: 'utf8', timeout: 600000 });
  assert.strictEqual(r.status, 0, (r.stderr || '') + (r.stdout || ''));
});
