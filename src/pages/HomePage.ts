import { Page, Locator } from '@playwright/test';
import BasePage from './BasePage';

export default class HomePage extends BasePage {
  readonly userIcon: Locator;
  readonly cartIcon: Locator;
  readonly firstProduct: Locator;
  readonly Speakers: Locator;
  readonly Tablets: Locator;
  readonly laptops: Locator;
  readonly mice: Locator;
  readonly headphones: Locator;
  constructor(page: Page) {
    super(page);
    this.userIcon = page.locator('#menuUser');
    this.cartIcon = page.getByRole('link', { name: /cart/i });
    this.firstProduct = page.locator('div.product').first();
     
    this.Speakers = page.locator('#speakersImg')
    this.Tablets = page.locator('#tabletsImg')
    this.laptops = page.locator('#laptopsImg')
    this.mice = page.locator('#miceImg')
    this.headphones = page.locator('#headphonesTxt')

  }

  async open() {
    await this.page.goto('/');
  }

  async openLogin() {
    await this.userIcon.click();
    
  }

  async openCart() {
    await this.cartIcon.click();
  }
}