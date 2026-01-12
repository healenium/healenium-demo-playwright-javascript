import { test, expect } from '@playwright/test';

const TIMEOUT = 5000;
const WAIT_TIMEOUT = 350;

test.describe('Parent-Child Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://healenium.github.io/healenium-test-env/index.html', { waitUntil: 'load' });
  });

  test('Locator API - Select and verify several inputs CSS FirstChild', async ({ page }) => {
    test.slow();
    // Find element by CSS first-child pseudo-selector before selector change
    const firstChildElement = page.locator('test_tag:first-child');
    await expect(firstChildElement).toBeVisible();

    // Click Change locators button
    const submitBtn = page.locator('#Submit');
    await expect(submitBtn).toBeVisible();
    await submitBtn.click({ timeout: TIMEOUT });

    // Find element by CSS first-child pseudo-selector after selector change (should be healed)
    const healedFirstChildElement = page.locator('test_tag:first-child');
    await expect(healedFirstChildElement).toBeVisible();
  });

  test('Locator API - Select and verify several inputs CSS LastChild', async ({ page }) => {
    test.slow();
    // Find element by CSS last-child pseudo-selector before selector change
    const lastChildElement = page.locator('child_tag:last-child');
    await expect(lastChildElement).toBeVisible();

    // Click Change locators button
    const submitBtn = page.locator('#Submit');
    await expect(submitBtn).toBeVisible();
    await submitBtn.click({ timeout: TIMEOUT });

    // Find element by CSS last-child pseudo-selector after selector change (should be healed)
    const healedLastChildElement = page.locator('child_tag:last-child');
    await expect(healedLastChildElement).toBeVisible();
  });

  test('Page API - Select and verify several inputs CSS FirstChild', async ({ page }) => {
    test.slow();
    // Find element by CSS first-child pseudo-selector before selector change
    const firstChildElement = await page.$('test_tag:first-child');
    expect(await firstChildElement.isVisible()).toBe(true);

    // Click Change locators button
    const submitBtn = await page.$('#Submit');
    await submitBtn.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Find element by CSS first-child pseudo-selector after selector change (should be healed)
    const healedFirstChildElement = await page.$('test_tag:first-child');
    await page.waitForTimeout(WAIT_TIMEOUT);
    expect(await healedFirstChildElement.isVisible()).toBe(true);
  });

  test('Page API - Select and verify several inputs CSS LastChild', async ({ page }) => {
    test.slow();
    // Find element by CSS last-child pseudo-selector before selector change
    const lastChildElement = await page.$('child_tag:last-child');
    expect(await lastChildElement.isVisible()).toBe(true);

    // Click Change locators button
    const submitBtn = await page.$('#Submit');
    await submitBtn.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Find element by CSS last-child pseudo-selector after selector change (should be healed)
    const healedLastChildElement = await page.$('child_tag:last-child');
    await page.waitForTimeout(WAIT_TIMEOUT);
    expect(await healedLastChildElement.isVisible()).toBe(true);
  });
  
});
