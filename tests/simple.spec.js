import { test, expect } from '@playwright/test';

const TIMEOUT = 5000;
const WAIT_TIMEOUT = 350;

test.describe('Simple Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://healenium.github.io/healenium-test-env/index.html', { waitUntil: 'load' });
  });

  test('Locator API - Update locator for element with css Enabled', async ({ page }) => {
    test.slow();
    const enabledElement = page.locator('textarea:enabled');
    await expect(enabledElement).toBeVisible();

    // Click Change locators button
    const submitBtn = page.locator('#Submit');
    await expect(submitBtn).toBeVisible();
    await submitBtn.click({ timeout: TIMEOUT });

    // Find enabled element by CSS pseudo-selector after selector change (should be healed)
    const changedEnabledElement = page.locator('textarea:enabled');
    await expect(changedEnabledElement).toBeVisible();
  });

  
  test('Page API - Update locator for element with css Enabled', async ({ page }) => {
    test.slow();
    const enabledElement = await page.$('textarea:enabled');
    expect(await enabledElement.isVisible()).toBe(true);

    // Click Change locators button
    const submitBtn = await page.$('#Submit');
    await submitBtn.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Find enabled element by CSS pseudo-selector after selector change (should be healed)
    const changedEnabledElement = await page.$('textarea:enabled');
    await page.waitForTimeout(WAIT_TIMEOUT);
    expect(await changedEnabledElement.isVisible()).toBe(true);
  });
  
});
