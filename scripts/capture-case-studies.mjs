import { chromium } from '@playwright/test';
const browser = await chromium.launch({ channel: 'chrome' });
for (const width of [1440, 1024, 768, 390]) {
  const page = await browser.newPage({
    viewport: { width, height: 1000 },
    reducedMotion: 'reduce',
  });
  for (const slug of ['tab', 'gradesense', 'empowher']) {
    await page.goto(`http://127.0.0.1:3000/projects/${slug}`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: `/tmp/ayug-v3-${slug}-${width}.png` });
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    );
    if (overflow) throw new Error(`${slug} overflows at ${width}px`);
    if (slug === 'gradesense' && (width === 1440 || width === 390)) {
      await page.locator('#architecture').scrollIntoViewIfNeeded();
      await page.waitForTimeout(800);
      await page.screenshot({ path: `/tmp/ayug-v3-gradesense-architecture-${width}.png` });
      await page.locator('#database').scrollIntoViewIfNeeded();
      await page.waitForTimeout(800);
      await page.screenshot({ path: `/tmp/ayug-v3-gradesense-database-${width}.png` });
    }
  }
  await page.close();
}
await browser.close();
