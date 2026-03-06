/**
 * Healing behaviour for Playwright expect(locator) state assertion methods.
 *
 * @see https://playwright.dev/docs/test-assertions
 */
import { test, expect } from '@playwright/test';

const TIMEOUT = 5000;

test.describe('Expect - State Assertions (healing)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://healenium.github.io/healenium-test-env/index.html', { waitUntil: 'load' });
  });

  test('toBeAttached', async ({ page }) => {
    test.slow();
    const loc = page.locator('.test_class');
    await expect(loc).toBeAttached({ timeout: TIMEOUT });

    // Click Change locators button to test healing
    await page.locator('#Submit').click();

    const healed = page.locator('.test_class');
    await expect(healed).toBeAttached({ timeout: TIMEOUT });
  });

  test('toBeVisible', async ({ page }) => {
    test.slow();
    const loc = page.locator('.test_class');
    await expect(loc).toBeVisible({ timeout: TIMEOUT });

    // Click Change locators button to test healing
    await page.locator('#Submit').click();

    const healed = page.locator('.test_class');
    await expect(healed).toBeVisible({ timeout: TIMEOUT });
  });

  test('toBeDisabled', async ({ page }) => {
    test.slow();
    const loc = page.locator('#change_id');
    await expect(loc).not.toBeDisabled({ timeout: TIMEOUT });

    // Click Change locators button to test healing
    await page.locator('#Submit').click();

    // Test healing - same action should work after locator change
    const healed = page.locator('#change_id');
    await expect(healed).not.toBeDisabled({ timeout: TIMEOUT });
  });


});
