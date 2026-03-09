
/**
 * Healing behaviour for Playwright expect(locator) property assertion methods.
 *
 * @see https://playwright.dev/docs/test-assertions
 */
import { test, expect } from '@playwright/test';

const TIMEOUT = 5000;

test.describe('Expect - Property Assertions (healing)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://healenium.github.io/healenium-test-env/index.html', { waitUntil: 'load' });
  });

  test('toHaveAttribute', async ({ page }) => {
    test.slow();
    const loc = page.locator('input#newValue');
    await expect(loc).toHaveAttribute('type', 'text', { timeout: TIMEOUT });

    // Click Change locators button to test healing
    await page.locator('#Submit').click();

    // Test healing - same action should work after locator change
    const healed = page.locator('input#newValue');
    await expect(healed).toHaveAttribute('type', 'text', { timeout: TIMEOUT });
  });


  test('toHaveJSProperty', async ({ page }) => {
    test.slow();
    const loc = page.locator('input#newValue');
    await expect(loc).toHaveJSProperty('type', 'text', { timeout: TIMEOUT });

    // Click Change locators button to test healing
    await page.locator('#Submit').click();

    // Test healing - same action should work after locator change
    const healed = page.locator('input#newValue');
    await expect(healed).toHaveJSProperty('type', 'text', { timeout: TIMEOUT });

  });


  test('toHaveId', async ({ page }) => {
    test.slow();
    const loc = page.locator('input#change_className');
    await expect(loc).toHaveId('change_className', { timeout: TIMEOUT });

    // Click Change locators button to test healing
    await page.locator('#Submit').click();

    // Test healing - same action should work after locator change
    const healed = page.locator('input#change_className');
    await expect(healed).toHaveId('change_className', { timeout: TIMEOUT });
  });

  test('toHaveRole', async ({ page }) => {
    test.slow();
    const loc = page.locator('input#change_className');
    await expect(loc).toHaveRole('textbox', { timeout: TIMEOUT });

    // Click Change locators button to test healing
    await page.locator('#Submit').click();

    // Test healing - same action should work after locator change
    const healed = page.locator('input#change_className');
    await expect(healed).toHaveRole('textbox', { timeout: TIMEOUT });
  });


});
