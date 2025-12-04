export class DashboardPage{
    constructor(page){

        this.page=page;
        this.products= page.locator('.card-body');
        this.productTitles= page.locator(".card-body b")
        this.Topcart=page.locator("[routerlink*='cart']");


    }
 async searchProductAddcart(productname){
     await this.productTitles.first().waitFor();
const titles= await this.products.locator("b").allTextContents();
console.log(titles);

let count=await this.products.count();
for (let i = 0; i < count; i++) {
if (await this.products.nth(i).locator("b").textContent()===productname) {
     await this.products.nth(i).locator("text=Add to Cart").click();
    break;
}
};
 }

 async NavigateToCart(){

   await this.Topcart.click();
 }
}