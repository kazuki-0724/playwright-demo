#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const reportPath = process.argv[2] || path.join(process.cwd(), 'test-results', 'last-run.json');

function readJson(p) {
  if (!fs.existsSync(p)) {
    throw new Error(`Report not found: ${p}`);
  }
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function walkSuites(suites, out) {
  for (const suite of suites || []) {
    for (const spec of suite.specs || []) {
      for (const test of spec.tests || []) {
        const failedResults = (test.results || []).filter((r) => r.status === 'failed');
        if (failedResults.length > 0) {
          const first = failedResults[0];
          const firstError = (first.errors || [])[0] || {};
          out.push({
            title: spec.title || '(no-title)',
            location: spec.location ? `${spec.location.file}:${spec.location.line}` : 'unknown',
            message: String(firstError.message || first.error?.message || 'Unknown error').split('\n')[0],
          });
        }
      }
    }
    walkSuites(suite.suites || [], out);
  }
}

try {
  const data = readJson(reportPath);
  const hasRunnerErrors = Array.isArray(data.errors) && data.errors.length > 0;
  const expectedCount = Number(data.stats?.expected || 0);

  if (hasRunnerErrors || expectedCount === 0) {
    const firstError = (data.errors && data.errors[0] && data.errors[0].message) || 'No tests executed';
    console.log('status: fail');
    console.log('failed-test: runner');
    console.log('location: n/a');
    console.log(`reason: ${String(firstError).split('\n')[0]}`);
    console.log('failed-count: 1');
    process.exit(1);
  }

  const failures = [];
  walkSuites(data.suites || [], failures);

  if (failures.length === 0) {
    console.log('status: pass');
    process.exit(0);
  }

  const first = failures[0];
  console.log('status: fail');
  console.log(`failed-test: ${first.title}`);
  console.log(`location: ${first.location}`);
  console.log(`reason: ${first.message}`);
  console.log(`failed-count: ${failures.length}`);
  process.exit(1);
} catch (err) {
  console.error(`summary-error: ${err.message}`);
  process.exit(2);
}
