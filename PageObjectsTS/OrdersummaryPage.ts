import { expect, type Locator, type Page } from '@playwright/test';

export class OrdersummaryPage {
  private readonly page: Page;
  private readonly successMessage: Locator;
  private readonly orderID: Locator;
  private readonly ordersHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.successMessage = page.locator('.hero-primary');
    this.orderID = page.locator("label[class='ng-star-inserted']");
    this.ordersHeader = page.locator("button[routerlink*='myorders']");
  }

  async verifyOrderDetails(expectedMessage: string): Promise<string> {
    await expect(this.successMessage).toHaveText(expectedMessage);
    const pid = await this.orderID.textContent();
    const idarray = pid?.split(' ') ?? [];
    const ordernumber = idarray[2] ?? '';
    return ordernumber;
  }

  async gotoOrdersPage(): Promise<void> {
    await this.ordersHeader.click();
  }
}

