import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('homepage, case studies, metadata, and keyboard project navigation', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('working systems');
  await page.locator('.atlas-node').first().focus();
  await expect(page.locator('.atlas-preview strong')).toContainText('TAB');
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL('/projects/tab');
  for (const name of ['tab', 'gradesense', 'empowher']) {
    await page.goto(`/projects/${name}`);
    await expect(page.locator('.case-title')).toBeVisible();
    await expect(
      page.getByRole('heading', {
        name: name === 'gradesense' ? 'Engineering Challenges' : 'Challenges & solutions',
        exact: true,
      }),
    ).toBeAttached();
    expect(await page.title()).toContain('Ayug Poudel');
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
      'content',
      /Ayug Poudel/,
    );
  }
  await page.goto('/projects/unknown');
  await expect(page.getByRole('heading', { name: 'Outside the atlas.' })).toBeVisible();
  expect(errors).toEqual([]);
});

test('orbital motion eases down on focus, resumes, and can be disabled', async ({ page }) => {
  await page.goto('/');
  const node = page.locator('.atlas-node').first();
  await expect(node).toBeVisible();
  const pos = async () => {
    return node.evaluate((el) => {
      const matrix = (
        el.parentElement as unknown as SVGGraphicsElement
      ).transform.baseVal.consolidate()?.matrix;
      return matrix ? { x: matrix.e, y: matrix.f } : { x: 0, y: 0 };
    });
  };
  const a = await pos();
  await page.waitForTimeout(650);
  const b = await pos();
  expect(Math.hypot(b.x - a.x, b.y - a.y)).toBeGreaterThan(1);
  await node.focus();
  await page.waitForTimeout(1200);
  const c = await pos();
  await page.waitForTimeout(650);
  const d = await pos();
  expect(Math.hypot(d.x - c.x, d.y - c.y)).toBeLessThan(Math.hypot(b.x - a.x, b.y - a.y) * 0.5);
  expect(Math.hypot(d.x - c.x, d.y - c.y)).toBeGreaterThan(0.05);
  await page.getByRole('button', { name: 'Pause orbital animation' }).click();
  await page.waitForTimeout(100);
  const e = await pos();
  await page.waitForTimeout(350);
  expect(await pos()).toEqual(e);
  await page.getByRole('button', { name: 'Resume orbital animation' }).click();
  await page.waitForTimeout(350);
  expect(await pos()).not.toEqual(e);
});

test('reduced motion preserves a stationary, navigable atlas', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const node = page.locator('.atlas-node').first();
  await node.focus();
  const transform = await node.evaluate((el) => el.parentElement?.getAttribute('transform'));
  await page.waitForTimeout(400);
  expect(await node.evaluate((el) => el.parentElement?.getAttribute('transform'))).toEqual(
    transform,
  );
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL('/projects/tab');
});

test('navigation, honest configuration dialog, and discipline controls', async ({ page }) => {
  await page.goto('/');
  await page
    .getByRole('navigation', { name: 'Main navigation' })
    .getByRole('button', { name: 'Résumé.pdf' })
    .click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await page.getByRole('button', { name: 'Data & research', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Data & research', exact: true })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await expect(page.locator('.atlas-node.is-dim')).toHaveCount(5);
  await page.getByRole('link', { name: 'Explore projects', exact: true }).click();
  await expect(page).toHaveURL(/#work/);
});

test('observatory navigation, brand-icon links, and shared disciplines', async ({ page }) => {
  await page.goto('/');
  const nav = page.getByRole('navigation', { name: 'Main navigation' });
  await expect(nav.getByRole('link', { name: 'Projects', exact: true })).toBeVisible();
  await expect(nav.getByRole('link', { name: 'Contact', exact: true })).toBeVisible();
  const social = page.locator('.hero-socials .github-icon');
  await expect(social.locator('svg')).toHaveAttribute('viewBox', '0 0 24 24');
  await expect(social).toHaveAttribute('href', 'https://github.com/ayugpoudel');
  await expect(page.locator('.hero-socials .linkedin-icon')).toHaveAttribute(
    'href',
    'https://www.linkedin.com/in/ayugp/',
  );
  await page.getByRole('button', { name: 'Full-stack', exact: true }).click();
  await expect(page.locator('.atlas-node.is-dim')).toHaveCount(3);
  await page.getByRole('button', { name: 'Backend', exact: true }).click();
  await expect(page.locator('.atlas-node.is-dim')).toHaveCount(2);
  await nav.getByRole('link', { name: 'Contact', exact: true }).click();
  await expect(nav.getByRole('link', { name: 'Contact', exact: true })).toHaveAttribute(
    'aria-current',
    'location',
  );
});

for (const width of [320, 390, 768, 1024, 1440]) {
  test(`responsive layout at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
    ).toBe(true);
    if (width < 600) {
      await page.getByRole('button', { name: 'Menu' }).click();
      await page
        .getByRole('navigation', { name: 'Main navigation' })
        .getByRole('link', { name: 'Experience', exact: true })
        .click();
      await expect(page).toHaveURL(/#experience/);
      await expect(page.getByRole('button', { name: 'Menu' })).toHaveAttribute(
        'aria-expanded',
        'false',
      );
    }
    for (const slug of ['tab', 'gradesense', 'empowher']) {
      await page.goto(`/projects/${slug}`);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
      ).toBe(true);
    }
  });
}

test('homepage and case study pass automated accessibility checks', async ({ page }) => {
  for (const url of ['/', '/projects/tab', '/projects/gradesense', '/projects/empowher']) {
    await page.goto(url);
    // Reveal content through scrolling before assessing actual rendered contrast.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 650) {
        window.scrollTo({ top: y, behavior: 'instant' });
        await new Promise((r) => setTimeout(r, 40));
      }
    });
    await page.waitForTimeout(800);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect(results.violations).toEqual([]);
  }
});

test('content and project navigation work without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(baseURL || 'http://127.0.0.1:3000/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await page.locator('.project-title').first().click();
  await expect(page).toHaveURL(/projects\/tab/);
  await expect(page.locator('.case-title')).toBeVisible();
  await context.close();
});

test('complete case studies, private attribution, and interactive architecture', async ({
  page,
}) => {
  await page.goto('/projects/gradesense');
  await expect(page.locator('.study-section')).toHaveCount(13);
  await expect(page.locator('.study-scope')).toContainText('Dipendra Kandel');
  await expect(page.locator('.study-scope')).toContainText('Jay Bhatta');
  await expect(page.locator('a[href*="comp423-26s/learn-with-ai-e2"]')).toHaveCount(0);
  await expect(page.locator('img[src*="Ina"], img[src*="Sally"]')).toHaveCount(0);
  await page.getByRole('button', { name: /Instructor & TA/ }).click();
  await expect(page.locator('.workflow-steps')).toContainText('Define the exam');
  await page.getByRole('button', { name: /Student experience/ }).click();
  await expect(page.locator('.workflow-steps')).toContainText('Preview AI feedback');
  await page.goto('/projects/tab');
  const explorer = page.locator('.message-pipeline').first();
  await explorer.getByRole('button', { name: /Settle/ }).click();
  await expect(explorer.locator('.pipeline-detail')).toContainText('no real monetary value');
  await expect(
    page.locator('a[href="https://github.com/psap2/hacknc-2026"]').first(),
  ).toBeVisible();
  await page.goto('/');
  await expect(page.locator('#archive')).toContainText('Bet-Tracker');
  await expect(page.locator('#archive')).toContainText('Early full-stack scaffold');
  await page.locator('.atlas-directory summary').click();
  await page
    .locator('.atlas-directory')
    .getByRole('button', { name: 'GradeSense', exact: true })
    .click();
  await expect(page.locator('.atlas-readout')).toContainText('Angular');
  await expect(page.locator('.atlas-related')).toContainText('Shared engineering');
});
