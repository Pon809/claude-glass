// One-off probe following the control-ui interaction loop:
// snapshot -> one action -> snapshot -> verify.
// Usage: node demo/harness/probe.mjs [port]
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const port = process.argv[2] ?? 3000;
const out = 'demo/harness/artifacts';
mkdirSync(out, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 900, height: 640 } });
await page.goto(`http://127.0.0.1:${port}/`);
await page.locator('[data-app-root]').waitFor();

await page.screenshot({ path: `${out}/01-before.png`, fullPage: true });

const row = page.locator('[data-list="open"] li').first();
const text = await row.locator('span').textContent();
await row.getByRole('button', { name: 'Mark done' }).click();

await page.screenshot({ path: `${out}/02-after-click.png`, fullPage: true });

await page.getByRole('tab', { name: 'Done' }).click();
await page.screenshot({ path: `${out}/03-done-view.png`, fullPage: true });

const inDone = await page.locator('[data-list="done"] li', { hasText: text }).count();
const stillOpen = await page.locator('[data-list="open"] li', { hasText: text }).count();

await browser.close();

console.log(JSON.stringify({ task: text, inDone, stillOpen }));
if (inDone === 1 && stillOpen === 0) {
  console.log('PASS: task moved to Done');
} else {
  console.log('FAIL: task did not move to Done');
  process.exit(1);
}
