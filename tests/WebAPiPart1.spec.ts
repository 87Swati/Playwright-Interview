import { test, expect, request } from '@playwright/test';
import { ApiUtils } from '../utils-ts/ApiUtils';

const loginPayload = {
  userEmail: 'jswati12@gmail.com',
  userPassword: 'Data@1234',
};

const orderPayload = {
  orders: [{ country: 'India', productOrderedId: '68a961459320a140fe1ca57a' }],
};

let orderResponse: { token: string; ordernumber: string };

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new ApiUtils(apiContext, loginPayload);
  orderResponse = await apiUtils.createOrder(orderPayload);
});

test('@api Browser context playwright testcase', async ({ page }) => {
    const ordersHeader = page.locator("button[routerlink*='myorders']");
    const rows = page.locator('tbody tr');
    const orderIdDetails = page.locator('.col-text');

    await page.addInitScript((token: string) => {
      window.localStorage.setItem('token', token);
    }, orderResponse.token);

    await page.goto('https://rahulshettyacademy.com/client');
    await ordersHeader.click();
    await page.locator('tbody').waitFor();

    for (let i = 0; i < (await rows.count()); ++i) {
      const rowOrderId = await rows.nth(i).locator('th').textContent();
      if (rowOrderId && orderResponse.ordernumber.includes(rowOrderId)) {
        await rows.nth(i).locator('button').first().click();
        break;
      }
    }

    const pid1 = await orderIdDetails.textContent();
    expect(pid1 && orderResponse.ordernumber.includes(pid1)).toBeTruthy();
  }
);

