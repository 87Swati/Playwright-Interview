import type { Locator, Page } from '@playwright/test';

export class DashboardPage {
  private readonly page: Page;
  private readonly products: Locator;
  private readonly productTitles: Locator;
  private readonly topCart: Locator;

  constructor(page: Page) {
    this.page = page;
    this.products = page.locator('.card-body');
    this.productTitles = page.locator('.card-body b');
    this.topCart = page.locator("[routerlink*='cart']");
  }

  async searchProductAddcart(productName: string): Promise<void> {
    await this.productTitles.first().waitFor();
    const titles = await this.products.locator('b').allTextContents();
    console.log(titles);

    const count = await this.products.count();
    for (let i = 0; i < count; i++) {
      if ((await this.products.nth(i).locator('b').textContent()) === productName) {
        await this.products.nth(i).locator('text=Add to Cart').click();
        break;
      }
    }
  }

  async navigateToCart(): Promise<void> {
    await this.topCart.click();
  }
}

