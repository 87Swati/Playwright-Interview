import {test,expect} from '@playwright/test'

test ('more validations',async ({page})=>{
await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
// await page.goto("https://www.google.com/");
// await page.goBack();
// await page.goForward();
await expect(page.locator("#displayed-text")).toBeVisible();
await page.locator("#hide-textbox").click();
await expect(page.locator("#displayed-text")).toBeHidden();
await page.pause();

//handle java script dialog
page.on('dialog', dialog=>dialog.accept());
await page.locator("#confirmbtn").click();
await page.locator("#mousehover").hover();
await page.getByText("Top").click();
const framepage= page.frameLocator("#courses-iframe");
await framepage.locator()




});