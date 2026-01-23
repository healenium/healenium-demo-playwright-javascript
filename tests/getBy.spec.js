import { test, expect } from '@playwright/test';

const TIMEOUT = 5000;

test.describe('Locator API - getBy - Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://healenium.github.io/healenium-test-env/index.html', { waitUntil: 'load' });
  });

  test('click action', async ({ page }) => {
    test.slow();

    const inputField = page.locator('.test_class');
    await inputField.click({ timeout: TIMEOUT });

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    await submitBtn.click();

    // Test healing - same action should work after locator change
    const healedInputField = page.locator('.test_class');
    await healedInputField.click({ timeout: TIMEOUT });
  });

  test('double click action', async ({ page }) => {
    test.slow();
    const inputField = page.locator('input#change_id');
    await inputField.dblclick({ timeout: TIMEOUT });

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    await submitBtn.click();

    // Test healing - same action should work after locator change
    const healedInputField = page.locator('input#change_id');
    await healedInputField.dblclick({ timeout: TIMEOUT });
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

  test('getByLabel', async ({ page }) => {
    test.slow();
    await expect(page.getByLabel('Field with hover')).toBeVisible({ TIMEOUT });

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');  
    await submitBtn.click();

    // Test healing - same action should work after locator change
    await expect(page.getByLabel('Field with hover')).toBeVisible({ TIMEOUT });

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

});
