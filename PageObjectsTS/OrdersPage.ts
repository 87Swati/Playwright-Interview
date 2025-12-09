import { expect, type Locator, type Page } from '@playwright/test';

export class OrdersPage {
  private readonly page: Page;
  private readonly rows: Locator;
  private readonly orderIdDetails: Locator;
  private readonly pageBody: Locator;

  constructor(page: Page) {
    this.page = page;
    this.rows = page.locator('tbody tr');
    this.orderIdDetails = page.locator('.col-text');
    this.pageBody = this.page.locator('tbody');
  }

  async verifyOrdernumebrpreset(orderNumber: string): Promise<void> {
    await this.pageBody.waitFor();

    for (let i = 0; i < (await this.rows.count()); ++i) {
      const rowOrderId = await this.rows.nth(i).locator('th').textContent();
      if (rowOrderId && orderNumber.includes(rowOrderId)) {
        await this.rows.nth(i).locator('button').first().click();
        break;
      }
    }
  }

  async getOrderId(): Promise<string | null> {
    return await this.orderIdDetails.textContent();
  }
}

