import { expect, type Locator, type Page } from '@playwright/test';

export class CheckoutPage {
  private readonly page: Page;
  private readonly cvv: Locator;
  private readonly card: Locator;
  private readonly deliverId: Locator;
  private readonly country: Locator;
  private readonly dropdown: Locator;
  private readonly placeOrder: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cvv = page.locator("input[class='input txt']");
    this.card = page.locator("input[class='input txt']").nth(1);
    this.deliverId = page.locator("input[class*='input txt text-validated ng']");
    this.country = page.locator("[placeholder='Select Country']");
    this.dropdown = page.locator('.ta-results');
    this.placeOrder = page.locator('.action__submit');
  }

  async fillCheckoutDetails(
    cvvvalue: string,
    cardname: string,
    countryname: string,
    userEmail: string
  ): Promise<void> {
    await this.cvv.nth(0).fill(cvvvalue);
    await this.card.fill(cardname);

    const deliveryEmail = await this.deliverId.inputValue();
    expect(deliveryEmail).toEqual(userEmail);

    await this.country.pressSequentially('ind');
    await this.dropdown.waitFor();

    const optionsCount = await this.dropdown.locator('button').count();
    for (let i = 0; i < optionsCount; ++i) {
      const text = await this.dropdown.locator('button').nth(i).textContent();
      if (text === countryname) {
        await this.dropdown.locator('button').nth(i).click();
        break;
      }
    }
  }

  async gotoOrdersummaryPage(): Promise<void> {
    await this.placeOrder.click();
  }
}

