import { Page, Locator } from '@playwright/test';
import BasePage from './BasePage';

export default class CheckoutPage extends BasePage {
  readonly payNowButton: Locator;
  readonly usernameInOrderPayment : Locator
  readonly passwordInOrderPayment : Locator
  readonly loginButton_InOrderPayment : Locator
  readonly RegisterButton_InOrderPayment : Locator
  readonly Next_Tab_Button : Locator
  readonly Tab_shippingDetails : Locator
  readonly Tab_PaymentMethod : Locator
  readonly Payment_Selection : Locator
  constructor(page: Page) {
    super(page);
    this.payNowButton = page.getByRole('button', { name: /pay now/i });
    this.usernameInOrderPayment = page.locator("input[name= 'usernameInOrderPayment' ]")
    this.passwordInOrderPayment = page.locator("input[name= 'passwordInOrderPayment' ]")
    this.loginButton_InOrderPayment = page.locator('#login_btn')
    this.RegisterButton_InOrderPayment = page.locator('#registration_btn')
    this.Next_Tab_Button = page.locator('#next_btn')
    this.Tab_shippingDetails = page.getByText('1. SHIPPING DETAILS');
    this.Tab_PaymentMethod = page.getByText('2. PAYMENT METHOD');
    this.Payment_Selection = page.locator('#paymentMethod')
  }

  async completePaymentDummy() {
    if (await this.payNowButton.isVisible()) {
      await this.payNowButton.click();
    }
  }
}