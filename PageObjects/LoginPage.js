  
    export class LoginPage {

        constructor(page) {
         this.page = page;
         this.loginbutton=page.locator('input#login');
         this.Email=page.locator('#userEmail'); 
         this.password=page.locator('#userPassword');

    }

    async validLogin(userEmail,  password)
    {
        await this.Email.fill(userEmail);
        await this.password.fill(password);
        await this.loginbutton.click();
        await this.page.waitForLoadState('networkidle');
    }

    async goto(){
    await this.page.goto("https://rahulshettyacademy.com/client");
}

    }; 
    //module.exports = { LoginPage };
