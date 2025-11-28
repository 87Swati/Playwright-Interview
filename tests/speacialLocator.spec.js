import { test, expect } from '@playwright/test';
import { text } from 'stream/consumers';

test.only('Playwright special locator',async ({page})=>
{
 await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("1273238");
    await page.getByRole("button",{name:'Submit'}).click();
   expect (await page.getByText(" The Form has been submitted successfully!.").isVisible()).toBeTruthy();
   await page.getByRole("link",{name:'Shop'}).click();
   await page.locator("app-card").filter({hasText:'Nokia Edge'}).getByRole("button").click();


});
