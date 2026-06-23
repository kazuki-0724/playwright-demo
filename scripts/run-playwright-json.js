#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

function resolveDefaultSpec() {
  const testsDir = path.join(process.cwd(), 'tests');
  if (!fs.existsSync(testsDir)) {
    return 'test_001.spec.ts';
  }
  const specs = fs
    .readdirSync(testsDir)
    .filter((name) => /^test_\d{3}\.spec\.(ts|js)$/.test(name))
    .sort();
  return specs.length > 0 ? specs[specs.length - 1] : 'test_001.spec.ts';
}

const rawSpecArg = process.argv[2] || resolveDefaultSpec();
const specArg = rawSpecArg.replace(/^tests[\\/]/, '');
const outPath = path.join(process.cwd(), 'test-results', 'last-run.json');

const args = ['playwright', 'test', specArg, '--project=chromium', '--reporter=json'];
const result = spawnSync('npx', args, {
  encoding: 'utf8',
  shell: true,
  cwd: process.cwd(),
});

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, result.stdout || '', 'utf8');

if (result.stderr) {
  process.stderr.write(result.stderr);
}

process.exit(result.status ?? 1);
