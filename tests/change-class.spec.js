
import { test, expect } from '@playwright/test';

const TIMEOUT = 5000;

test.describe('Healing class name change', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://healenium.github.io/healenium-test-env/index.html', { waitUntil: 'load' });
  });

  test('click action', async ({ page }) => {
    test.slow();

    const inputField = page.locator('input#change_className');
    await inputField.click({ timeout: TIMEOUT });

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    await submitBtn.click();

    // Test healing - same action should work after locator change
    const healedInputField = page.locator('input#change_className');
    await healedInputField.click({ timeout: TIMEOUT });
  });

  test('fill and clear actions', async ({ page }) => {
    test.slow();
    const inputField = page.locator('input#change_className');
    await inputField.fill('Hello World', { timeout: TIMEOUT });
    await expect(inputField).toHaveValue('Hello World');

    await inputField.clear({ timeout: TIMEOUT });
    await expect(inputField).toHaveValue('');

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    await submitBtn.click();

    // Test healing - same actions should work after locator change
    const healedInputField = page.locator('input#change_className');
    await healedInputField.fill('Hello World', { timeout: TIMEOUT });
    await expect(healedInputField).toHaveValue('Hello World');

    await healedInputField.clear({ timeout: TIMEOUT });
    await expect(healedInputField).toHaveValue('');
  });

  test('type action', async ({ page }) => {
    test.slow();
    const inputField = page.locator('input#change_className');
    await inputField.type('Typing text slowly', { timeout: TIMEOUT });
    await expect(inputField).toHaveValue('Typing text slowly');

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    await submitBtn.click();

    // Test healing - same action should work after locator change
    const healedInputField = page.locator('input#change_className');
    await healedInputField.type('Typing text slowly', { timeout: TIMEOUT });
    await expect(healedInputField).toHaveValue('Typing text slowlyTyping text slowly');
  });

  test('press sequentially action', async ({ page }) => {
    test.slow();
    const inputField = page.locator('input#change_className');
    await inputField.pressSequentially('Sequential typing', {
      delay: 100,
      timeout: TIMEOUT
    });
    await expect(inputField).toHaveValue('Sequential typing');

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');  
    await submitBtn.click();

    // Test healing - same action should work after locator change
    const healedInputField = page.locator('input#change_className');
    await healedInputField.pressSequentially('Sequential typing', {
      delay: 100,
      timeout: TIMEOUT
    });
    await expect(healedInputField).toHaveValue('Sequential typingSequential typing');
  });

  test('focus and blur actions', async ({ page }) => {
    test.slow();
    const inputField = page.locator('input#change_className');
    await inputField.focus({ timeout: TIMEOUT });
    await expect(inputField).toBeFocused();
    await inputField.blur({ timeout: TIMEOUT });
    await expect(inputField).not.toBeFocused();

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    await submitBtn.click();

    // Test healing - same actions should work after locator change
    const healedInputField = page.locator('input#change_className');
    await healedInputField.focus({ timeout: TIMEOUT });
    await expect(healedInputField).toBeFocused();
    await healedInputField.blur({ timeout: TIMEOUT });
    await expect(healedInputField).not.toBeFocused();
  });

  test('scroll into view if needed action', async ({ page }) => {
    test.slow();
    const inputField = page.locator('input#change_className');
    await inputField.scrollIntoViewIfNeeded({
      timeout: TIMEOUT,
      strict: true
    });
    await expect(inputField).toBeVisible();

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    await submitBtn.click();

    // Test healing - same action should work after locator change
    const healedInputField = page.locator('input#change_className');
    await healedInputField.scrollIntoViewIfNeeded({
      timeout: TIMEOUT,
      strict: true
    });
    await expect(healedInputField).toBeVisible();
  });

  test('select text action', async ({ page }) => {
    test.slow();
    const inputField = page.locator('input#change_className');
    await inputField.fill('Text to select', { timeout: TIMEOUT });
    await inputField.selectText({
      timeout: TIMEOUT,
      strict: true
    });
    await expect(inputField).toBeFocused();

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    await submitBtn.click();

    // Test healing - same action should work after locator change
    const healedInputField = page.locator('input#change_className');
    await healedInputField.fill('Text to select', { timeout: TIMEOUT });
    await healedInputField.selectText({
      timeout: TIMEOUT,
      strict: true
    });
    await expect(healedInputField).toBeFocused();
  });

  test('inputValue method', async ({ page }) => {
    test.slow();
    const inputField = page.locator('input#change_className');
    await inputField.fill('Test value', { timeout: TIMEOUT });
    const inputValue = await inputField.inputValue({ timeout: TIMEOUT });
    expect(inputValue).toBe('Test value');

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    await submitBtn.click();

    // Test healing - same action should work after locator change
    const healedInputField = page.locator('input#change_className');
    await healedInputField.fill('Test value', { timeout: TIMEOUT });
    const healedInputValue = await healedInputField.inputValue({ timeout: TIMEOUT });
    expect(healedInputValue).toBe('Test value');
  });

  test('getAttribute method', async ({ page }) => {
    test.slow();
    const inputField = page.locator('input#change_className');
    const attribute = await inputField.getAttribute('name', { timeout: TIMEOUT });
    expect(attribute).toBe("Field2");

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    await submitBtn.click();

    // Test healing - same action should work after locator change
    const healedInputField = page.locator('input#change_className');
    const healedAttribute = await healedInputField.getAttribute('name', { timeout: TIMEOUT });
    expect(healedAttribute).toBe("Field2");
  });

  test('isEnabled method', async ({ page }) => {
    test.slow();
    const inputField = page.locator('input#change_className');
    const isEnabled = await inputField.isEnabled({ timeout: TIMEOUT });
    expect(isEnabled).toBe(true);

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    await submitBtn.click();

    // Test healing - same action should work after locator change
    const healedInputField = page.locator('input#change_className');
    const healedIsEnabled = await healedInputField.isEnabled({ timeout: TIMEOUT });
    expect(healedIsEnabled).toBe(true);
  });

  test('isDisabled method', async ({ page }) => {
    test.slow();
    const inputField = page.locator('input#change_className');
    const isDisabled = await inputField.isDisabled({ timeout: TIMEOUT });
    expect(isDisabled).toBe(false);

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    await submitBtn.click();

    // Test healing - same action should work after locator change
    const healedInputField = page.locator('input#change_className');
    const healedIsDisabled = await healedInputField.isDisabled({ timeout: TIMEOUT });
    expect(healedIsDisabled).toBe(false);
  });

  test('isEditable method', async ({ page }) => {
    test.slow();
    const inputField = page.locator('input#change_className');
    const isInputEditable = await inputField.isEditable({ timeout: TIMEOUT });
    expect(isInputEditable).toBe(true);

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    await submitBtn.click();

    // Test healing - same action should work after locator change
    const healedInputField = page.locator('input#change_className');
    const healedIsInputEditable = await healedInputField.isEditable({ timeout: TIMEOUT });
    expect(healedIsInputEditable).toBe(true);
  });

  test('waitFor action', async ({ page }) => {
    test.slow();
    const testClassInput = page.locator('input#change_className');

    await testClassInput.waitFor({ state: 'visible', timeout: TIMEOUT });

    await testClassInput.fill('WaitFor test', { timeout: TIMEOUT });
    await expect(testClassInput).toHaveValue('WaitFor test', { timeout: TIMEOUT });

    // Wait for element to be attached (more general than visible)
    await testClassInput.waitFor({ state: 'attached', timeout: TIMEOUT });

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    await submitBtn.click();

    // Test healing - same actions should work after locator change
    const healedTestClassInput = page.locator('input#change_className');

    await healedTestClassInput.waitFor({ state: 'visible', timeout: TIMEOUT });

    await healedTestClassInput.fill('WaitFor test', { timeout: TIMEOUT });
    await expect(healedTestClassInput).toHaveValue('WaitFor test', { timeout: TIMEOUT });

    // Wait for element to be attached (more general than visible)
    await healedTestClassInput.waitFor({ state: 'attached', timeout: TIMEOUT });
  });

  test('waitFor action with strict mode', async ({ page }) => {
    test.slow();
    const testClassInput = page.locator('input#change_className');

    // Wait with strict mode (will fail if multiple elements match)
    await testClassInput.waitFor({
      state: 'visible',
      timeout: TIMEOUT,
      strict: true
    });

    await expect(testClassInput).toBeVisible({ timeout: TIMEOUT });

    // Click Change locators button to test healing
    const submitBtn = page.locator('#Submit');
    await submitBtn.click();    

    // Test healing - same actions should work after locator change
    const healedTestClassInput = page.locator('input#change_className');

    // Wait with strict mode (will fail if multiple elements match)
    await healedTestClassInput.waitFor({
      state: 'visible',
      timeout: TIMEOUT,
      strict: true
    });

    await expect(healedTestClassInput).toBeVisible({ timeout: TIMEOUT });
  });

});
