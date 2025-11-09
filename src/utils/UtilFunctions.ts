import { Page, Locator, expect } from '@playwright/test';

export default class UtilFunctions {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Check that a given button is disabled
   */
  async verifyButtonDisabled(button: Locator, buttonName: string) {
    await expect(button, `${buttonName} should be disabled`).toBeDisabled();
    console.log(`${buttonName} is disabled as expected.`);
  }

  /**
   * Check that a given button is enabled
   */
  async verifyButtonEnabled(button: Locator, buttonName: string) {
    await expect(button, `${buttonName} should be enabled`).toBeEnabled();
    console.log(`${buttonName} is enabled as expected.`);
  }

  /**
   * Verify heading text and visibility
   */
  async verifyHeadingVisible(heading: Locator, expectedText: string) {
    await expect(heading).toBeVisible({ timeout: 15000 });
    await expect(heading).toHaveText(new RegExp(expectedText, 'i'));
    console.log(`Heading '${expectedText}' is visible and correct.`);
  }

  /**
   * Verify that current URL contains specific path or fragment
   */
  async verifyUrlContains(expectedFragment: string) {
    await expect(this.page).toHaveURL(new RegExp(expectedFragment));
    console.log(`URL contains '${expectedFragment}' as expected.`);
  }

  /** verify whether the given element contains with expected */
 async verifyTextMatch(locator: Locator, expectedText: string, elementName?: string) {
    const name = elementName || 'Element';
    await this.page.waitForLoadState('networkidle', { timeout: 10000 });
    await expect(locator).toBeVisible();
    await expect(locator).toHaveText(new RegExp(`^${expectedText}$`, 'i'));
    console.log(`${name} text matched expected value: '${expectedText}'.`);
  }


 /**
   * Check a checkbox if it is not already checked
   */
  async checkCheckbox(checkbox: Locator, checkboxName: string) {
    await expect(checkbox).toBeVisible();
    const isChecked = await checkbox.isChecked();
    if (!isChecked) {
      await checkbox.check();
      console.log(`${checkboxName} checkbox has been checked.`);
    } else {
      console.log(`${checkboxName} checkbox was already checked.`);
    }
  }

async uncheckCheckbox(checkbox: Locator, checkboxName: string) {
    await expect(checkbox).toBeVisible();
    const isChecked = await checkbox.isChecked();
    if (isChecked) {
      await checkbox.uncheck();
      console.log(`${checkboxName} checkbox has been unchecked.`);
    } else {
      console.log(`${checkboxName} checkbox was already unchecked.`);
    }
  }



  /**
   * Click a button safely (waits for it to be visible and enabled)
   */
  async clickButton(button: Locator, buttonName: string) {
    await button.waitFor({state :"visible"})
    await expect(button).toBeVisible();
    await expect(button).toBeEnabled();
    await button.click();
    console.log(`${buttonName} button clicked successfully.`);
    await this.page.waitForLoadState('networkidle');
  }


   //to check error message for inline validation
  async validateInlineErrorMessage(inputLocator: Locator, expectedMessage: string) {
  const errorLabel = inputLocator.locator('..').locator('label.invalid');
  await expect(errorLabel).toBeVisible();
  await expect(errorLabel).toHaveText(expectedMessage);
  console.log(`Inline error message validated: '${expectedMessage}'`);
}

async generateRandomString(length: number): Promise<string>  {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}


/**
 * Verify that an element is present (and optionally visible)
 * Uses Playwright's built-in assertions for consistency.
 */
async verifyElementPresence(locator: Locator, elementName: string, shouldBeVisible = false) {
  if (shouldBeVisible) {
    await expect(locator, `${elementName} should be visible`).toBeVisible();
    console.log(`${elementName} is visible on the page.`);
  } else {
    const count = await locator.count();
    expect(count, `${elementName} should be present in the DOM`).toBeGreaterThan(0);
    console.log(`${elementName} is present in the DOM.`);
  }
}



/**
 * Verify that an element is NOT present (or NOT visible)
 * Uses Playwright's built-in assertions for consistency.
 */
async verifyElementNotPresent(locator: Locator, elementName: string, shouldBeVisible = false) {
  if (shouldBeVisible) {
    await expect(locator, `${elementName} should not be visible`).toBeHidden();
    console.log(`${elementName} is hidden as expected.`);
  } else {
    const count = await locator.count();
    expect(count, `${elementName} should not be present in the DOM`).toBe(0);
    console.log(`${elementName} is not present in the DOM.`);
  }
}

/**
 * Verify that an element contains the expected text (partial match).
 * Uses Playwright's built-in assertions.
 */
async verifyElementContainsText(locator: Locator, expectedText: string, elementName: string) {
  await expect(locator, `${elementName} should contain text '${expectedText}'`)
    .toContainText(expectedText, { ignoreCase: true });
  console.log(`${elementName} contains text: '${expectedText}'`);
}


}






