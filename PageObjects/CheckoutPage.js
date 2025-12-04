import { test, expect } from '@playwright/test';

/**
 * CheckoutPage - Page Object Model for checkout functionality
 * Handles all interactions with the checkout page including payment and delivery details
 */
export class CheckoutPage {

    /**
     * Constructor to initialize checkout page locators
     * @param {Page} page - Playwright page object
     */
    constructor(page) {
        this.page = page;
        this.cvv = page.locator("input[class='input txt']");
        this.card = page.locator("input[class='input txt']").nth(1);
        this.DeliverID = page.locator("input[class*='input txt text-validated ng']");
        this.Country = page.locator("[placeholder='Select Country']");
        this.dropdown = page.locator(".ta-results");
        this.placeOrder = page.locator(".action__submit");
    }

    /**
     * Fills checkout form with payment and delivery information
     * @param {string} cvvvalue - CVV security code
     * @param {string} cardname - Cardholder name
     * @param {string} countryname - Country to deliver to
     * @param {string} userEmail - User's email for delivery verification
     */
    async FillCheckoutDetails(cvvvalue, cardname, countryname,userEmail) {
        // Fill CVV field
        await this.cvv.nth(0).fill(cvvvalue);
        
        // Fill cardholder name
        await this.card.fill(cardname);
        
        // Retrieve and validate delivery email
        const DeliveryEmail = await this.DeliverID.inputValue();
        console.log(DeliveryEmail);
        expect(DeliveryEmail).toEqual(userEmail);
        
        // Enter country name character by character to trigger dropdown
        await this.Country.pressSequentially("ind");
        await this.dropdown.waitFor();
        
        // Loop through dropdown options to find and select matching country
        const optionsCount = await this.dropdown.locator("button").count();
        for (let i = 0; i < optionsCount; ++i) 
            {
            const text=await this.dropdown.locator("button").nth(i).textContent();          
            if (text === countryname) {
                await this.dropdown.locator("button").nth(i).click();
                break;
            }
        }         

    }
    async gotoOrdersummaryPage(){
            // Click Place Order button to submit
                await this.placeOrder.click();  
    }

}
