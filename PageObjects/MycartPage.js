import { Page, expect } from '@playwright/test';
export class MycartPage {

    constructor(page) {
        this.page = page;
        this.cartProducts= this.page.locator("div li").first();
        this.checkout = this.page.locator("//button[text()='Checkout']");
    

    }


    async verifyProductinCart(productname) {
        await this.cartProducts.waitFor();
        const bool = await this.page.locator(`h3:has-text('${productname}')`).isVisible();
        expect(bool).toBeTruthy();
     };

    async gotoCheckout() {
       await this.checkout.click();
       await this.page.waitForLoadState("domcontentloaded");

    };

}
