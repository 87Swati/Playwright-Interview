import type { Page } from '@playwright/test';
import { CheckoutPage } from './CheckoutPage';
import { DashboardPage } from './DashboardPage';
import { LoginPage } from './LoginPage';
import { MycartPage } from './MycartPage';
import { OrdersPage } from './OrdersPage';
import { OrdersummaryPage } from './OrdersummaryPage';

export class POManager {
  private readonly page: Page;
  private readonly loginPage: LoginPage;
  private readonly mycartPage: MycartPage;
  private readonly ordersPage: OrdersPage;
  private readonly dashboardPage: DashboardPage;
  private readonly checkoutPage: CheckoutPage;
  private readonly ordersummaryPage: OrdersummaryPage;

  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.mycartPage = new MycartPage(this.page);
    this.ordersPage = new OrdersPage(this.page);
    this.dashboardPage = new DashboardPage(this.page);
    this.checkoutPage = new CheckoutPage(this.page);
    this.ordersummaryPage = new OrdersummaryPage(this.page);
  }

  getLoginPage(): LoginPage {
    return this.loginPage;
  }

  getMycartPage(): MycartPage {
    return this.mycartPage;
  }

  getOrdersPage(): OrdersPage {
    return this.ordersPage;
  }

  getDashboardPage(): DashboardPage {
    return this.dashboardPage;
  }

  getCheckoutPage(): CheckoutPage {
    return this.checkoutPage;
  }

  getOrdersummaryPage(): OrdersummaryPage {
    return this.ordersummaryPage;
  }
}

