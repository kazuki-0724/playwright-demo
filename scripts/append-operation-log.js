#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const LOG_PATH = path.join(ROOT, 'logs', 'operation-log.md');

function arg(name) {
  const key = `--${name}=`;
  const found = process.argv.find((a) => a.startsWith(key));
  return found ? found.slice(key.length) : '';
}

function esc(value) {
  return String(value || '').replace(/\|/g, '\\|').replace(/\r?\n/g, ' ');
}

const no = arg('no');
const step = arg('step');
const action = arg('action');
const expected = arg('expected');
const actual = arg('actual');
const evidence = arg('evidence');

if (!no || !step) {
  console.error('Usage: npm run log:step -- --no=1 --step="Login" --action="..." --expected="..." --actual="..." --evidence="001_login.png"');
  process.exit(1);
}

if (!fs.existsSync(LOG_PATH)) {
  fs.mkdirSync(path.dirname(LOG_PATH), { recursive: true });
  fs.writeFileSync(
    LOG_PATH,
    '| No | Step | Action | Expected | Actual | Evidence |\n|---:|---|---|---|---|---|\n',
    'utf8'
  );
}

const line = `| ${esc(no)} | ${esc(step)} | ${esc(action)} | ${esc(expected)} | ${esc(actual)} | ${esc(evidence)} |\n`;
fs.appendFileSync(LOG_PATH, line, 'utf8');
console.log(`Appended: ${line.trim()}`);
