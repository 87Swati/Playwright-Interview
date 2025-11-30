import {test, expect,request} from '@playwright/test';
import { ApiUtils } from './utils/ApiUtils.js';

const loginPayload={userEmail: "jswati12@gmail.com", userPassword: "Data@1234"}
const orderPayload={orders:[{country:"India",productOrderedId:"68a961459320a140fe1ca57a"}]};
let Orderesponse;


test.beforeAll(async()=> {

    const apiContext= await request.newContext();
    const apiUtils=await new ApiUtils(apiContext,loginPayload);
     Orderesponse= await apiUtils.createOrder(orderPayload);
}  
);      


test('Browser context playwright testcase',async ({page})=>
{
const ordersHeader= page.locator("button[routerlink*='myorders']");
const rows = page.locator("tbody tr");
const orderIdDetails = page.locator(".col-text");




await page.addInitScript((token)=>{
    window.localStorage.setItem('token',token);
},Orderesponse.token);
await page.goto("https://rahulshettyacademy.com/client");

await ordersHeader.click();
await page.locator("tbody").waitFor();

for (let i = 0; i <await rows.count(); ++i) 
   {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (Orderesponse.ordernumber.includes(rowOrderId)) 
         {
         await rows.nth(i).locator("button").first().click();
         console.log("Inside if");
         break;
      }
   };
   

const pid1=await orderIdDetails.textContent();
console.log(pid1);
    await page.pause();
expect (Orderesponse.ordernumber.includes(pid1)).toBeTruthy();


console.log("swati");    

});


    