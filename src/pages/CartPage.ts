import { Page, Locator } from '@playwright/test';
import BasePage from './BasePage';

export default class CartPage extends BasePage {
  readonly checkoutBtn: Locator;
  readonly add_to_cartBtn : Locator;
  readonly ToolTip_cart : Locator 
  readonly checkoutBtn_in_popup : Locator 
  readonly product_Heading_in_Add_to_Cart : Locator
  readonly cartItemName : Locator

  constructor(page: Page) {
    super(page);
    this.checkoutBtn = page.locator('#checkOutButton');
    this.add_to_cartBtn = page.locator('button[name="save_to_cart"]')
    this.ToolTip_cart = page.locator('#toolTipCart')
    this.checkoutBtn_in_popup = page.locator('#checkOutPopUp')
    this.product_Heading_in_Add_to_Cart = page.locator('div[id="Description"] h1')
    this.cartItemName = page.locator('#shoppingCart .productName')
    
  }

}