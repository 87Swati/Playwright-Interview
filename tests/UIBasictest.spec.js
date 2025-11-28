import { test, expect } from '@playwright/test';
//import { only } from 'node:test';

test('Browser context playwright testcase',async ({browser})=>
{
//playwright code
// you need to write await before every line of code
const context =await browser.newContext();
const page=await context.newPage();
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
const username=page.locator('#username');
const password=page.locator("[type='password']");
const signbutton=page.locator('#signInBtn');
const cardTitles=page.locator('.card-title a');


console.log(await page.title());
let title=await page.title();
await expect(title).toContain("Rahul");
// css , xpath 
await username.fill("rahulshettyacademyfgf");
await password.fill("learning");
await signbutton.click();
console.log(await page.locator("[style='display: block;']").textContent());
await expect (page.locator("[style='display: block;']")).toContainText("Incorrect")
await username.fill("");
await username.fill("rahulshettyacademy");
await password.fill("learning");
await signbutton.click();
//console.log(await page.locator('.card-title a').nth(0).textContent())
console.log(await cardTitles.first().textContent());
const alltitles=await cardTitles.allTextContents();
console.log(alltitles);


});

test.only ('page context playwright testcase', async({page})=>
{
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
const username=page.locator('#username');
const password=page.locator("[type='password']");
// static drop down
const dropdown= page.locator('select.form-control');
const radio=page.locator('.radiotextsty').last();
const popupok=page.locator("#okayBtn");
const terms=page.locator("#terms");
const blinktext=page.locator("[href*='documents-request']");




await username.fill("rahulshettyacademy");
await password.fill("learning");
await dropdown.selectOption("consult");
await radio.click();
await popupok.click();
// assertion to check if that radion button is checked or not
await expect(radio).toBeChecked();
// ischecked() only returns the true or fast not assert
console.log(await radio.isChecked());
await terms.check();
await expect(terms).toBeChecked();
await terms.uncheck();
await expect(terms).not.toBeChecked();
await expect (blinktext).toHaveAttribute("class","blinkingText");
// to pause the ex
// ecution 
//await page.pause();
});

test('Child Window handling', async({browser})=>
{
const context=await browser.newContext();
const page= await context.newPage();
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
const username=page.locator('#username');
const password=page.locator("[type='password']");
const blinktext=page.locator("[href*='documents-request']");

// Promise.all will take an array of areguments and execute the steps asynchronously
//and return an arrray or promises
const [newPage1]=await Promise.all([
context.waitForEvent('page'),//listen for any new page pending,rejected, fulfilled
blinktext.click(),])
let text =await newPage1.locator("[class='im-para red']").textContent();
let subext =text.split("@");
let domain=subext[1].split(" ")[0];
console.log(text);
console.log(domain);
await username.fill(domain);
    console.log(await page.locator("#username").inputValue());



});
