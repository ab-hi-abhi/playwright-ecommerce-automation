import { Page, Locator ,expect} from '@playwright/test';
import BasePage from './BasePage';
import UtilFunctions from '../utils/UtilFunctions';

export default class ProductPage extends BasePage {
  readonly addToCartBtn: Locator;
  readonly all_products: Locator;
  readonly utilFunctions: UtilFunctions;
  constructor(page: Page) {
    super(page);
    this.utilFunctions = new UtilFunctions(page)
    this.addToCartBtn = page.getByRole('button', { name: /add to cart/i });
    this.all_products = page.locator('a.productName ')

  }

  async selectProductByName(productName: string) {
  // Wait for network requests to compelete
  await this.page.waitForLoadState('networkidle');
  await this.all_products.first().waitFor()
  // Filter to the specific product
  const product = this.all_products.filter({ hasText: productName });

  // Ensure it exists
  const count = await product.count();
  expect(count, `Product '${productName}' not found`).toBeGreaterThan(0);

  await this.utilFunctions.clickButton(product,"Prodcut")

  await this.page.waitForLoadState('networkidle');
  console.log(`Selected product: ${productName}`);
}
}

