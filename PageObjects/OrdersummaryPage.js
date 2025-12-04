import { expect } from "@playwright/test";

export class OrdersummaryPage {
    constructor(page) {
        this.page = page;
this.successMessage =page.locator(".hero-primary");
this.orderID=page.locator("label[class='ng-star-inserted']");
this.ordersHeader= page.locator("button[routerlink*='myorders']");
    }
    
    async verifyOrderDetails(Expectedmessage) {
        await expect (this.successMessage).toHaveText(Expectedmessage);
        const PID = await this.orderID.textContent();
        const idarray = PID.split(" ");
        const ordernumber = idarray[2];
        console.log(ordernumber);
        return ordernumber; 
    }

    async gotoOrdersPage() {
         await this.ordersHeader.click();
    }
}   