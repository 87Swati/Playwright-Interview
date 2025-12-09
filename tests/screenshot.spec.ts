import { test, expect,request, type Page } from '@playwright/test';

//test.describe.configure({ mode: 'parallel' });
test.fixme('more validations',async ({page})=>{
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

test('screenshot taking ',async ({page})=>{
await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
// await page.goto("https://www.google.com/");
// await page.goBack();
// await page.goForward();
await expect(page.locator("#displayed-text")).toBeVisible();
//take screen shot for specific element
await page.locator("#displayed-text").screenshot({path:'element.png'});
await page.locator("#hide-textbox").click();
//take screenshot for whole page
await page.screenshot({ path: 'screenshot.png' });
await expect(page.locator("#displayed-text")).toBeHidden();
//await page.pause();

//handle java script dialog

// const framepage= page.frameLocator("#courses-iframe");
// await framepage.locator()

});

test.fixme('Visual tesing  ',async ({page})=>{
await page.goto("https://www.flightaware.com/");
expect(await page.screenshot()).toMatchSnapshot('flighthomepage.png');


// const framepage= page.frameLocator("#courses-iframe");
// await framepage.locator()

});