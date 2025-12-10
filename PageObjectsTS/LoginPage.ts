import type { Locator, Page } from '@playwright/test';

export class LoginPage {
  private readonly page: Page;
  private readonly loginbutton: Locator;
  private readonly email: Locator;
  private readonly password: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginbutton = page.locator('input#login');
    this.email = page.locator('#userEmail');
    this.password = page.locator('#userPassword');
  }

  async validLogin(userEmail: string, password: string): Promise<void> {
    await this.email.fill(userEmail);
    await this.password.fill(password);
    await this.loginbutton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async goto(): Promise<void> {
    await this.page.goto('https://rahulshettyacademy.com/client');
  }
}

