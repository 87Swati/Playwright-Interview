import  { expect } from "@playwright/test";
export class OrdersPage {
    constructor(page) {

        this.page = page;
        this.rows = page.locator("tbody tr");
        this.orderIdDetails=page.locator(".col-text");
        this.pagebody = this.page.locator("tbody");

    }


async verifyOrdernumebrpreset(ordernumber){

             await this.pagebody.waitFor();

        for (let i = 0; i < await this.rows.count(); ++i) {

        const rowOrderId = await this.rows.nth(i).locator("th").textContent();
        if (ordernumber.includes(rowOrderId)) {
            await this.rows.nth(i).locator("button").first().click();
            //await this.page.waitForLoadState("domcontentloaded");

            console.log("Inside if");
            break;
        }
         
    }

};

async getOrderId()
{
    return await this.orderIdDetails.textContent();
}
};
