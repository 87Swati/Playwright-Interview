import { expect, type Locator, type Page } from '@playwright/test';

export class MycartPage {
  private readonly page: Page;
  private readonly cartProducts: Locator;
  private readonly checkout: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartProducts = this.page.locator('div li').first();
    this.checkout = this.page.locator("//button[text()='Checkout']");
  }

  async verifyProductinCart(productname: string): Promise<void> {
    await this.cartProducts.waitFor();
    const visible = await this.page.locator(`h3:has-text('${productname}')`).isVisible();
    expect(visible).toBeTruthy();
  }

  async gotoCheckout(): Promise<void> {
    await this.checkout.click();
    await this.page.waitForLoadState('domcontentloaded');
  }
}

