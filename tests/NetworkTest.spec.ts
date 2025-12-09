import { test, expect,request, type Page } from '@playwright/test';
import { ApiUtils } from '../utils-ts/ApiUtils';

const loginPayload = { userEmail: "jswati12@gmail.com", userPassword: "Data@1234" }
const orderPayload = { orders: [{ country: "India", productOrderedId: "68a961459320a140fe1ca57a" }] };
const fakePayLoadOrders = { data: [], message: "No Orders" };
  // const ordersHeader = page.locator("button[routerlink*='myorders']");
  let orderResponse: { token: string; ordernumber: string };


test.beforeAll(async () => {

   const apiContext = await request.newContext();
   const apiUtils = await new ApiUtils(apiContext, loginPayload);
   orderResponse = await apiUtils.createOrder(orderPayload);
})


test('Verify the emplty state', async ({ page }) => {
   page.addInitScript(value => {
      window.localStorage.setItem('token', value);
   }, orderResponse.token);

   await page.goto("https://rahulshettyacademy.com/client");
   await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
      async route => {
         //intercepting the response- API Response->{Playwright fake response}->Browser and returning empty array 
         const response = await page.request.fetch(route.request());
         let body = JSON.stringify(fakePayLoadOrders);
         await route.fulfill(
            {
               response,
               body
            }
         );
      });
   const ordersHeader = await page.locator("button[routerlink*='myorders']");
   await ordersHeader.click();
   await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")

   console.log(await page.locator(".mt-4").textContent());


}
);


