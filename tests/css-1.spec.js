import { test, expect } from '@playwright/test';

const TIMEOUT = 5000;
const WAIT_TIMEOUT = 350;

test.describe('Update locator for element with css attribute', () => {

  test('Page api', async ({ page }) => {
    // Navigate to the callback test page
    await page.goto('https://mdn.github.io/web-components-examples/life-cycle-callbacks/', { waitUntil: 'domcontentloaded' });

    // Click add square button and verify square element
    const addSquareBtn = await page.$('//button[contains(@class, "add")]');
    await addSquareBtn.click({ timeout: TIMEOUT });

    // Verify square element exists
    const squareElement = await page.$('custom-square[color="red"]');
    const visible = await squareElement.isVisible({ timeout: TIMEOUT });
    expect(visible).toBe(true);

    // Test healing multiple times
    for (let i = 0; i <= 1; i++) {
      // Click update square button
      const updateSquareBtn = await page.$('//button[contains(@class, "update")]');
      await updateSquareBtn.click({ timeout: TIMEOUT });
      await page.waitForTimeout(WAIT_TIMEOUT);

      // Verify square element still exists (should be healed)
      const healedSquareElement = await page.$('custom-square[color="red"]');
      await page.waitForTimeout(WAIT_TIMEOUT);
      const healedVisible = await healedSquareElement.isVisible({ timeout: TIMEOUT });
      expect(healedVisible).toBe(true);
    }
  });

  test('Locator api', async ({ page }) => {
    // Navigate to the callback test page
    test.slow();
    await page.goto('https://mdn.github.io/web-components-examples/life-cycle-callbacks/', { waitUntil: 'load' });

    // Click add square button and verify square element
    const addSquareBtn = page.locator('//button[contains(@class, "add")]');
    await expect(addSquareBtn).toBeVisible();
    await addSquareBtn.click({ timeout: TIMEOUT });

    // Verify square element exists
    const squareElement = page.locator('custom-square[color="red"]');
    await expect(squareElement).toBeVisible();

    // Test healing multiple times
    for (let i = 0; i <= 1; i++) {
      // Click update square button
      const updateSquareBtn = page.locator('//button[contains(@class, "update")]');
      await expect(updateSquareBtn).toBeVisible();
      await updateSquareBtn.click({ timeout: TIMEOUT });

      // Verify square element still exists (should be healed)
      const healedSquareElement = page.locator('custom-square[color="red"]');
      await expect(healedSquareElement).toBeVisible();
    }
  });  
});
