

import { LoginPage } from './Loginpage';
import { MycartPage } from './MycartPage';
import { OrdersPage } from './OrdersPage';
import { DashboardPage } from './DashboardPage';
import { CheckoutPage } from './CheckoutPage';
import { OrdersummaryPage } from './OrdersummaryPage';  



/**
 * POManager class is responsible for managing page objects in the application.
 * It initializes instances of various page objects and provides getter methods
 * to access them.
 * 
 * @class POManager
 * @param {Object} page - The Playwright page object used for navigation and interaction.
 */
export class POManager {
    /**
     * Creates an instance of POManager.
     * 
     * @param {Object} page - The Playwright page object.
     */
    constructor(page) {
        // Initialize page objects
        this.page = page;
        this.LoginPage = new LoginPage(this.page);
        this.MycartPage = new MycartPage(this.page);
        this.OrdersPage = new OrdersPage(this.page);
        this.DashboardPage = new DashboardPage(this.page);
        this.CheckoutPage = new CheckoutPage(this.page);
        this.OrdersummaryPage = new OrdersummaryPage(this.page);
    }

    /**
     * Returns the LoginPage object.
     * 
     * @returns {LoginPage} The LoginPage instance.
     */
    getLoginPage() {
        return this.LoginPage;
    }

    /**
     * Returns the MycartPage object.
     * 
     * @returns {MycartPage} The MycartPage instance.
     */
    getMycartPage() {
        return this.MycartPage;
    }

    /**
     * Returns the OrdersPage object.
     * 
     * @returns {OrdersPage} The OrdersPage instance.
     */
    getOrdersPage() {
        return this.OrdersPage;
    }

    /**
     * Returns the DashboardPage object.
     * 
     * @returns {DashboardPage} The DashboardPage instance.
     */
    getDashboardPage() {
        return this.DashboardPage;
    }

    /**
     * Returns the CheckoutPage object.
     * 
     * @returns {CheckoutPage} The CheckoutPage instance.
     */
    getCheckoutPage() {
        return this.CheckoutPage;
    }

    /**
     * Returns the OrdersummaryPage object.
     * 
     * @returns {OrdersummaryPage} The OrdersummaryPage instance.
     */
    getOrdersummaryPage() {
        return this.OrdersummaryPage;
    }
}