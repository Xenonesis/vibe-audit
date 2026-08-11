import { expect, test } from '@playwright/test';

test('runtime smoke', async ({ page }) => {
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];
  const failedRequests: string[] = [];
  page.on('console', m => { if (m.type() === 'error') consoleErrors.push(m.text()); });
  page.on('pageerror', e => pageErrors.push(e.message));
  page.on('requestfailed', r => failedRequests.push(`${r.method()} ${r.url()} :: ${r.failure()?.errorText ?? ''}`));
  await page.goto('/');
  await expect(page.locator('body')).toBeVisible();
  expect(pageErrors, 'uncaught browser errors').toEqual([]);
  expect(consoleErrors, 'console errors').toEqual([]);
  expect(failedRequests, 'unexpected failed requests').toEqual([]);
});
