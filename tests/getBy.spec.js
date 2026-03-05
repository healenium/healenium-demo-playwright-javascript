import { test, expect } from '@playwright/test';

const TIMEOUT = 5000;

test.describe('Locator API - getBy - Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://healenium.github.io/healenium-test-env/index.html', { waitUntil: 'load' });
  });

  test('getByTitle', async ({ page }) => {
    test.slow();
    await expect(page.getByTitle('Validate change test id')).toBeVisible({ TIMEOUT });

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    await submitBtn.click();

    // Test healing - same action should work after locator change
    await expect(page.getByTitle('Validate change test id')).toBeVisible({ TIMEOUT });
  });

  test('getByRole - img - alt', async ({ page }) => {
    test.slow();
    await expect(page.getByRole('img', { name: 'Healenium Logo' })).toBeVisible({ TIMEOUT });

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    await submitBtn.click();

    // Test healing - same action should work after locator change
    await expect(page.getByRole('img', { name: 'Healenium Logo' })).toBeVisible({ TIMEOUT });
  });

});
