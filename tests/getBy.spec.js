import { test, expect } from '@playwright/test';

const TIMEOUT = 5000;

test.describe('Locator API - getBy - Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://healenium.github.io/healenium-test-env/index.html', { waitUntil: 'load' });
  });

  test('getByTitle', async ({ page }) => {
    test.slow();
    await expect(page.locator('input#validate_testId')).toBeVisible({ TIMEOUT });

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    await submitBtn.click();

    // Test healing - same action should work after locator change
    await expect(page.locator('input#validate_testId')).toBeVisible({ TIMEOUT });
  });

  test('getByRole - img - alt', async ({ page }) => {
    test.slow();
    await expect(page.locator('img#logo_img')).toBeVisible({ TIMEOUT });

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    await submitBtn.click();

    // Test healing - same action should work after locator change
    await expect(page.locator('img#logo_img')).toBeVisible({ TIMEOUT });
  });

});