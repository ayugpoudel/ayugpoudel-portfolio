import { chromium } from '@playwright/test';
const browser = await chromium.launch({ channel: 'chrome' });
for (const [name, width, height] of [
  ['desktop', 1440, 1000],
  ['laptop', 1024, 900],
  ['tablet', 768, 1024],
  ['mobile', 390, 844],
]) {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
  await page.goto('http://127.0.0.1:3000/', { waitUntil: 'networkidle' });
  await page.screenshot({ path: `/tmp/systems-atlas-${name}.png` });
  if (name === 'desktop') {
    for (let y = 0; y < (await page.evaluate(() => document.body.scrollHeight)); y += 700) {
      await page.evaluate((y) => window.scrollTo(0, y), y);
      await page.waitForTimeout(90);
    }
    await page.waitForTimeout(700);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);
    await page.screenshot({ path: '/tmp/systems-atlas-full.png', fullPage: true });
    await page.goto('http://127.0.0.1:3000/projects/tab', { waitUntil: 'networkidle' });
    await page.screenshot({ path: '/tmp/systems-atlas-case.png' });
  }
  await page.close();
}
await browser.close();
