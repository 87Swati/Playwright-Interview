const { LoginPage } = require('./Loginpage');
const { MycartPage } = require('./MycartPage');
const { OrdersPage } = require('./OrdersPage');
const { DashboardPage } = require('./DashboardPage');
const { CheckoutPage } = require('./CheckoutPage');
const { OrdersummaryPage } = require('./OrdersummaryPage');




export class POManager {
    constructor(page) {
        this.page = page;
        this.LoginPage = new LoginPage(this.page);
        this.MycartPage = new MycartPage(this.page);
        this.OrdersPage = new OrdersPage(this.page);
        this.DashboardPage = new DashboardPage(this.page);
        this.CheckoutPage = new CheckoutPage(this.page);
        this.OrdersummaryPage = new OrdersummaryPage(this.page);
    }

    getLoginPage() {

        return this.LoginPage;
    }
    getMycartPage() {

        return this.MycartPage;
    }

    getOrdersPage() {

        return this.OrdersPage;
    }
    getDashboardPage() {

        return this.DashboardPage;
    }
    getCheckoutPage() {

        return this.CheckoutPage;
    }
    getOrdersummaryPage() {

        return this.OrdersummaryPage;
    }
}