import { test, expect } from '@playwright/test';


test('Browser context playwright testcase',async ({page})=>
{

const userEmail="jswati12@gmail.com";
const Email=page.locator('#userEmail'); 
const password=page.locator('#userPassword');
const loginbutton=page.locator('input#login');
const prodcuts= page.locator('.card-body');
const productname="ZARA COAT 3"	;
const Topcart=page.locator("[routerlink*='cart']");
const checkout=page.locator("//button[text()='Checkout']");
const cvv=page.locator("input[class='input txt']");
const card=page.locator("input[class='input txt']").nth(1);
const DeliverID=page.locator("input[class*='input txt text-validated ng']");
const Country=page.locator("[placeholder='Select Country']");
const dropdown = page.locator(".ta-results");
const placeOrder=page.locator(".action__submit");
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
const titles= await prodcuts.locator("b").allTextContents();
console.log(titles);

let count=await prodcuts.count();
for (let i = 0; i < count; i++) {
if (await prodcuts.nth(i).locator("b").textContent()===productname) {
     await prodcuts.nth(i).locator("text=Add to Cart").click();
    break;
}
};
await Topcart.click();
await page.locator("div li").first().waitFor();
//await page.waitForLoadState("domcontentloaded");
const bool =await page.locator("h3:has-text('Zara coat 3')").isVisible();
expect (bool).toBeTruthy();
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
const optionsCount = await dropdown.locator("button").count();
   for (let i = 0; i < optionsCount; ++i) {
      const text = await dropdown.locator("button").nth(i).textContent();
      if (text === " India") {
         await dropdown.locator("button").nth(i).click();
         break;
      }
   }
await placeOrder.click();
await expect (successMessage).toHaveText(" Thankyou for the order. ");
const PID=await orderID.textContent();
const idarray=PID.split(" ");
const ordernumber=idarray[2];
console.log(ordernumber);
await ordersHeader.click();
await page.locator("tbody").waitFor();

for (let i = 0; i <await rows.count(); ++i) 
   {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (ordernumber.includes(rowOrderId)) 
         {
         await rows.nth(i).locator("button").first().click();
         console.log("Inside if");
         break;
      }
   };

const pid1=await orderIdDetails.textContent();
expect (ordernumber.includes(pid1)).toBeTruthy();


console.log("swati");    
    await page.pause();
});


    
            



