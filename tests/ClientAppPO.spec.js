import { test, expect } from '@playwright/test';
import { POManager } from '../PageObjects/POManager';
import testData from '../utils/PlaceOrderTestData.json' assert { type: "json" };
import { Customtest } from '../utils/test-base';


for (const data of testData){
test(`Cliecnt app login  for ${data.productname}`,async ({page})=>
{
const poManager = new POManager(page);
const loginpageobject = poManager.getLoginPage();
await loginpageobject.goto();
await loginpageobject.validLogin(data.userEmail,data.password);
const dashboardpageobject = poManager.getDashboardPage();
await dashboardpageobject.searchProductAddcart(data.productname);
await dashboardpageobject.NavigateToCart();
const mycartpageobject = poManager.getMycartPage();
await mycartpageobject.verifyProductinCart(data.productname);
await mycartpageobject.gotoCheckout();
const checkoutpageobject = poManager.getCheckoutPage();
await checkoutpageobject.FillCheckoutDetails(data.cvvvalue,data.cardname,data.countryname,data.userEmail);
await checkoutpageobject.gotoOrdersummaryPage();
const ordersummarypageobject = poManager.getOrdersummaryPage();
const ordernumber=await ordersummarypageobject.verifyOrderDetails (data.Expectedmessage);
// Navigate to My Orders page
await ordersummarypageobject.gotoOrdersPage();  
const orderspageobject = poManager.getOrdersPage();
await orderspageobject.verifyOrdernumebrpreset(ordernumber); 
expect(ordernumber.includes(await orderspageobject.getOrderId())).toBeTruthy();
}
); 
};


Customtest(`Client app login test`,async ({page,testdataorder})=>
{
   console.log(testdataorder.productname);
const poManager = new POManager(page);
const loginpageobject = poManager.getLoginPage();
await loginpageobject.goto();
await loginpageobject.validLogin(testdataorder.userEmail,testdataorder.password);
const dashboardpageobject = poManager.getDashboardPage();
await dashboardpageobject.searchProductAddcart(testdataorder.productname);
await dashboardpageobject.NavigateToCart();
const mycartpageobject = poManager.getMycartPage();
await mycartpageobject.verifyProductinCart(testdataorder.productname);
await mycartpageobject.gotoCheckout();
const checkoutpageobject = poManager.getCheckoutPage();
await checkoutpageobject.FillCheckoutDetails(testdataorder.cvv,testdataorder.cardname,testdataorder.countryname,testdataorder.userEmail);
await checkoutpageobject.gotoOrdersummaryPage();
const ordersummarypageobject = poManager.getOrdersummaryPage();
const ordernumber=await ordersummarypageobject.verifyOrderDetails (testdataorder.Expectedmessage);
// Navigate to My Orders page
await ordersummarypageobject.gotoOrdersPage();  
const orderspageobject = poManager.getOrdersPage();
await orderspageobject.verifyOrdernumebrpreset(ordernumber); 
expect(ordernumber.includes(await orderspageobject.getOrderId())).toBeTruthy();
}); 






   


    
            



