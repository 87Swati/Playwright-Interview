import { test, expect } from '@playwright/test';
import { text } from 'stream/consumers';


test('Browser context playwright testcase',async ({page})=>
{

const userEmail="jswati12@gmail.com";
const Email=page.getByPlaceholder("email@example.com");
const password=page.getByPlaceholder("enter your passsword");
const loginbutton=page.getByRole("button",{name:'Login'});
const prodcuts= page.locator('.card-body');
const productname="ZARA COAT 3"	;
const Topcart=page.locator("[routerlink*='cart']");
const checkout=page.getByRole("button",{name:'Checkout'});

const cvv=page.locator("input[class='input txt']");
const card=page.locator("input[class='input txt']").nth(1);
const DeliverID=page.locator("input[class*='input txt text-validated ng']");
const Country=page.getByPlaceholder("Select Country");

const dropdown = page.locator(".ta-results");
const placeOrder=page.getByText("PLACE ORDER");
const successMessage =page.locator(".hero-primary");
const orderID=page.locator("label[class='ng-star-inserted']");
const ordersHeader= page.locator("button[routerlink*='myorders']");
const rows = page.locator("tbody tr");
const orderIdDetails = page.locator(".col-text");


await page.goto("https://rahulshettyacademy.com/client");
await Email.fill(userEmail);
await password.fill("Data@1234");
await loginbutton.click();
await page.waitForLoadState('networkidle');
//await page.locator('.card-body b').last().waitFor();
   await page.locator(".card-body b").first().waitFor();
await page.locator(".card-body").filter({hasText:'Zara coat 3'})
.getByRole("button",{name:'Add to Cart'}).click();

await page.getByRole("listitem").getByRole("button",{name:"Cart"}).click();

await page.locator("div li").first().waitFor();
await expect (page.getByText("Zara coat 3")).toBeVisible();
await checkout.click();
await page.waitForLoadState("domcontentloaded");
await cvv.nth(0).fill("111");
await card.fill("Swati Jain");
const DeliveryEmail=await DeliverID.inputValue();
console.log(DeliveryEmail);
expect(DeliveryEmail).toEqual(userEmail);
// enter the letters char by char
await Country.pressSequentially("ind");
await dropdown.waitFor();
await page.getByRole("button",{name:'India'}).nth(1).click();

await placeOrder.click();
await expect (page.getByText(" Thankyou for the order. ")).toBeVisible();




console.log("swati");    
    //await page.pause();
});


    
            



