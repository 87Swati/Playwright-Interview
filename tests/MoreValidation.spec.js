import {test,expect} from '@playwright/test'
import { tag } from '../playwright.config';

test ('more validations' , {tags: ['web']},async ({page})=>{
await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
// await page.goto("https://www.google.com/");
// await page.goBack();
// await page.goForward();
await expect(page.locator("#displayed-text")).toBeVisible();
await page.locator("#hide-textbox").click();
await expect(page.locator("#displayed-text")).toBeHidden();
//await page.pause();

//handle java script dialog
page.on('dialog', dialog=>dialog.accept());
await page.locator("#confirmbtn").click();
await page.locator("#mousehover").hover();
await page.getByText("Top").click();
const framepage= page.frameLocator("#courses-iframe");
const textCheck = await framepage.locator(".text h2").textContent();
  console.log(textCheck.split(" ")[1]);




});