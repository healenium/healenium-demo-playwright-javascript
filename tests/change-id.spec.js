import { test, expect } from '@playwright/test';
import path from 'path';

const TIMEOUT = 5000;

test.describe('Healing input id change', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://healenium.github.io/healenium-test-env/index.html', { waitUntil: 'load' });
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

  test('blur action', async ({ page }) => {
    test.slow();
    const inputField = page.locator('input#change_id');
    await inputField.blur({ timeout: TIMEOUT });

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    await submitBtn.click();

    // Test healing - same action should work after locator change
    const healedInputField = page.locator('input#change_id');
    await healedInputField.blur({ timeout: TIMEOUT });
  });

  test('press action', async ({ page }) => {
    test.slow();
    const inputField = page.locator('input#change_id');
    await inputField.fill('Test text', { timeout: TIMEOUT });
    await inputField.press('Enter', { timeout: TIMEOUT });

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    await submitBtn.click();  

    // Test healing - same action should work after locator change
    const healedInputField = page.locator('input#change_id');
    await healedInputField.fill('Test text', { timeout: TIMEOUT });
    await healedInputField.press('Enter', { timeout: TIMEOUT });
  });

  test('ariaSnapshot action', async ({ page }) => {
    test.slow();
    // Get ARIA snapshot of individual input
    const changeIdInput = page.locator('input#change_id');
    const inputAriaSnapshot = await changeIdInput.ariaSnapshot({ timeout: TIMEOUT });
    const stringifiedInputAriaSnapshot = JSON.stringify(inputAriaSnapshot, null, 2);

    // Verify snapshot contain expected properties
    expect(inputAriaSnapshot).toBeDefined();
    expect(stringifiedInputAriaSnapshot).toContain('textbox');

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    await submitBtn.click();

    // Test healing - same action should work after locator change
    const healedChangeIdInput = page.locator('input#change_id');
    const healedInputAriaSnapshot = await healedChangeIdInput.ariaSnapshot({ timeout: TIMEOUT });
    const healedStringifiedInputAriaSnapshot = JSON.stringify(healedInputAriaSnapshot, null, 2);

    // Verify snapshot contain expected properties
    expect(healedInputAriaSnapshot).toBeDefined();
    expect(healedStringifiedInputAriaSnapshot).toContain('textbox');
  });

  test('select Option action', async ({ page }) => {
    test.slow();
    const selectElement = page.locator('#select_item');
    await selectElement.selectOption({ label: 'Item 1' }, { timeout: TIMEOUT });

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');  
    await submitBtn.click();

    // Test healing - same action should work after locator change
    const healedSelectElement = page.locator('#select_item');
    await healedSelectElement.selectOption({ label: 'Item 1' }, { timeout: TIMEOUT });
    await expect(healedSelectElement).toHaveValue('1');
  });


  test('set Input Files action', async ({ page }) => {
    test.slow();
    const filePath = path.join(__dirname, '../test-data/test-file.txt');

    const inputFile = page.locator('#file_input');
    await inputFile.setInputFiles(filePath, { timeout: TIMEOUT });

    const value = await inputFile.inputValue({ timeout: TIMEOUT });

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    await submitBtn.click();  

    // Test healing - same action should work after locator change
    const healedInputFile = page.locator('#file_input');
    await healedInputFile.setInputFiles(filePath, { timeout: TIMEOUT });

    const healedValue = await healedInputFile.inputValue({ timeout: TIMEOUT });

    expect(healedValue).toBe(value);
  });
  
});
