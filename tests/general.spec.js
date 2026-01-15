
import { test, expect } from '@playwright/test';

const TIMEOUT = 5000;
const WAIT_TIMEOUT = 350;

test.describe('General Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://healenium.github.io/healenium-test-env/index.html', { waitUntil: 'load' });
  });

  test('Locator API - Input fields click with FindBy annotation', async ({ page }) => {
    test.slow();

    // Test elements before selector change
    const testClassElement = page.locator('input#change_className');
    await expect(testClassElement).toBeVisible();
    await testClassElement.press('Enter');

    const testTagElement = page.locator('input#change_element');
    await expect(testTagElement).toBeVisible();
    await testTagElement.isVisible();
    const classAttr = await testTagElement.getAttribute('class');
    expect(classAttr).toBe('shadow-input1');

    const changeNameElement = page.locator('input#change_wait');
    await expect(changeNameElement).toBeVisible();

    const linkElement = page.locator('a#change_links');
    await expect(linkElement).toBeVisible();
    await linkElement.isVisible();
    const linkClassAttr = await linkElement.getAttribute('class');
    expect(linkClassAttr).toBe('input1');

    // Click Change locators button
    const submitBtn = page.locator('#Submit');
    await expect(submitBtn).toBeVisible();
    await submitBtn.click({ timeout: TIMEOUT });

    // Test elements after selector change (should be healed)
    const healedTestClassElement = page.locator('input#change_className');
    await expect(healedTestClassElement).toBeVisible();
    await healedTestClassElement.press('Enter', { timeout: TIMEOUT });

    const healedTestTagElement = page.locator('input#change_element');
    await expect(healedTestTagElement).toBeVisible();
    await healedTestTagElement.isVisible({ timeout: TIMEOUT });
    const healedClassAttr = await healedTestTagElement.getAttribute('class', { timeout: TIMEOUT });
    expect(healedClassAttr).toBe(classAttr);


    const healedChangeNameElement = page.locator('input#change_wait');
    await expect(healedChangeNameElement).toBeVisible();
    await healedChangeNameElement.press('Enter', { timeout: TIMEOUT });

    const healedLinkElement = page.locator('a#change_links');
    await expect(healedLinkElement).toBeVisible();
    await healedLinkElement.isVisible();
    const healedLinkClassAttr = await healedLinkElement.getAttribute('class', { timeout: TIMEOUT });
    expect(healedLinkClassAttr).toBe(linkClassAttr);
  });

  test('Page API -Input fields click with FindBy annotation', async ({ page }) => {
    test.slow();
    // Test elements before selector change
    const testClassElement = await page.$('input#change_className');
    await testClassElement.press('Enter');

    const testTagElement = await page.$('input#change_element');
    const classAttr = await testTagElement.getAttribute('class');
    expect(classAttr).toBe('shadow-input1');
    await testTagElement.isVisible();

    const changeNameElement = await page.$('input#change_wait');
    await changeNameElement.press('Enter');

    const linkElement = await page.$('a#change_links');
    await linkElement.isVisible();
    const linkClassAttr = await linkElement.getAttribute('class');
    expect(linkClassAttr).toBe('input1');

    // Click Change locators button
    const submitBtn = await page.$('#Submit');
    await submitBtn.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);
    
    // Test elements after selector change (should be healed)
    const healedTestClassElement = await page.$('input#change_className');
    await page.waitForTimeout(WAIT_TIMEOUT);
    await healedTestClassElement.press('Enter');

    const healedTestTagElement = await page.$('input#change_element');
    await page.waitForTimeout(WAIT_TIMEOUT);
    const healedClassAttr = await healedTestTagElement.getAttribute('class');
    expect(healedClassAttr).toBe(classAttr);
    await healedTestTagElement.isVisible();

    const healedChangeNameElement = await page.$('input#change_wait');
    await page.waitForTimeout(WAIT_TIMEOUT);
    await healedChangeNameElement.press('Enter');

    const healedLinkElement = await page.$('a#change_links');
    await page.waitForTimeout(WAIT_TIMEOUT);
    await healedLinkElement.isVisible();
    const healedLinkClassAttr = await healedLinkElement.getAttribute('class');
    expect(healedLinkClassAttr).toBe(linkClassAttr);
  });

  test('Locator API - Input field enable to disable with FindBy annotation', async ({ page }) => {
    test.slow();

    // Find element before selector change (should be enabled)
    const enabledElement = page.locator('#change_enabled');
    await expect(enabledElement).toBeVisible();
    await expect(enabledElement).toBeEnabled();

    // Click Change locators button
    const submitBtn = page.locator('#Submit');
    await expect(submitBtn).toBeVisible();
    await submitBtn.click({ timeout: TIMEOUT });

    // Find element after selector change (should be healed and now disabled)
    const disabledElement = page.locator('#change_enabled');
    await expect(disabledElement).toBeVisible();
    await expect(disabledElement).toBeDisabled();
  });
  
  test('Page API - Input field enable to disable with FindBy annotation', async ({ page }) => {
    test.slow();
    // Find element before selector change (should be enabled)
    const enabledElement = await page.$('#change_enabled');
    expect(await enabledElement.isEnabled()).toBe(true);

    // Click Change locators button
    const submitBtn = await page.$('#Submit');
    await submitBtn.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Find element after selector change (should be healed and now disabled)
    const disabledElement = await page.$('#change_enabled');
    await page.waitForTimeout(WAIT_TIMEOUT);
    expect(await disabledElement.isDisabled()).toBe(true);
  });

  test('Locator API - Checkbox checked to unchecked with FindBy annotation', async ({ page }) => {
    test.slow();

    // Find checkbox before selector change (should be checked)
    const checkedElement = page.locator('#change_checked');
    await expect(checkedElement).toBeVisible();
    await expect(checkedElement).toBeChecked();

    // Click Change locators button
    const submitBtn = page.locator('#Submit');
    await expect(submitBtn).toBeVisible();
    await submitBtn.click({ timeout: TIMEOUT });

    // Find checkbox after selector change (should be healed and now unchecked)
    const uncheckedElement = page.locator('#change_checked');
    await expect(uncheckedElement).toBeVisible();
    await expect(uncheckedElement).not.toBeChecked();
  });

  test('Page API - Checkbox checked to unchecked with FindBy annotation', async ({ page }) => {
    test.slow();
    // Find checkbox before selector change (should be checked)
    const checkedElement = await page.$('#change_checked');
    expect(await checkedElement.isChecked()).toBe(true);

    // Click Change locators button
    const submitBtn = await page.$('#Submit');
    await submitBtn.click({ timeout: TIMEOUT });
    await page.waitForTimeout(WAIT_TIMEOUT);

    // Find checkbox after selector change (should be healed and now unchecked)
    const uncheckedElement = await page.$('#change_checked');
    await page.waitForTimeout(WAIT_TIMEOUT);
    expect(await uncheckedElement.isChecked()).toBe(false);
  });
});
