import { test, expect, type Page } from '@playwright/test';
import { POManager } from '../PageObjectsTS/POManager';
import testData from '../utils-ts/PlaceOrderTestData.json';
import { Customtest } from '../utils-ts/test-base';


for (const data of testData){
test(`@web Client app login  for ${data.productname}`,async ({page})=>
{
const poManager = new POManager(page);
const loginpageobject = poManager.getLoginPage();
await loginpageobject.goto();
await loginpageobject.validLogin(data.userEmail,data.password);
const dashboardpageobject = poManager.getDashboardPage();
await dashboardpageobject.searchProductAddcart(data.productname);
await dashboardpageobject.navigateToCart();
const mycartpageobject = poManager.getMycartPage();
await mycartpageobject.verifyProductinCart(data.productname);
await mycartpageobject.gotoCheckout();
const checkoutpageobject = poManager.getCheckoutPage();
await checkoutpageobject.fillCheckoutDetails(data.cvvvalue,data.cardname,data.countryname,data.userEmail);
await checkoutpageobject.gotoOrdersummaryPage();
const ordersummarypageobject = poManager.getOrdersummaryPage();
let ordernumber:any;
ordernumber=await ordersummarypageobject.verifyOrderDetails (data.Expectedmessage); 
// Navigate to My Orders p
await ordersummarypageobject.gotoOrdersPage();     
const orderspageobject = poManager.getOrdersPage();
await orderspageobject.verifyOrdernumebrpreset(ordernumber); 
expect(ordernumber?.includes(await orderspageobject.getOrderId())).toBeTruthy();
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
await dashboardpageobject.navigateToCart();
const mycartpageobject = poManager.getMycartPage();
await mycartpageobject.verifyProductinCart(testdataorder.productname);
await mycartpageobject.gotoCheckout();
const checkoutpageobject = poManager.getCheckoutPage();
await checkoutpageobject.fillCheckoutDetails(testdataorder.cvv,testdataorder.cardname,testdataorder.countryname,testdataorder.userEmail);
await checkoutpageobject.gotoOrdersummaryPage();
const ordersummarypageobject = poManager.getOrdersummaryPage();
let ordernumber:any;
 ordernumber=await ordersummarypageobject.verifyOrderDetails (testdataorder.Expectedmessage);
// Navigate to My Orders page
await ordersummarypageobject.gotoOrdersPage();  
const orderspageobject = poManager.getOrdersPage();
await orderspageobject.verifyOrdernumebrpreset(ordernumber); 
expect(ordernumber.includes(await orderspageobject.getOrderId())).toBeTruthy();
}); 






   


    
            



