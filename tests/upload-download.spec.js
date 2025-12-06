const exceljs = require('exceljs');
const { test, expect } = require('@playwright/test');

async function readExcelFile(searchValue, repalcedvale, Change, filePath) {

    const workbook = new exceljs.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = await workbook.getWorksheet('Sheet1');
    const output = await readexcel(worksheet, searchValue);
    const cell = worksheet.getCell(output.rowNumber, output.cellNumber + Change.changecol);
    cell.value = repalcedvale;
    await workbook.xlsx.writeFile(filePath);
    console.log(worksheet.getCell(output.rowNumber, output.cellNumber).value);

};

async function readexcel(worksheet, searchValue) {
    let output = { rowNumber: -1, cellNumber: -1 };

    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === searchValue) {
                console.log(`Found mango at row ${rowNumber}, column ${colNumber}`);
                output.rowNumber = rowNumber;
                output.cellNumber = colNumber;

            }
        });
    }
    );
    return output;
};


test('file upload download test', async ({ page }) => {
    const textSearch = 'Mango';
    const updateValue = '350';


    await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html');
    // const downloadpromise = page.waitForEvent('download');

    const [Download] = await Promise.all([
        page.waitForEvent('download'),
        await page.getByRole('button', { name: 'Download' }).click()
    ]);

    const filePath = await Download.path();

    await readExcelFile(textSearch, updateValue, { changerow: 0, changecol: 2 }, filePath);
    await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles(filePath);
    const textlocator = page.getByText(textSearch);
    const expectedrow = page.getByRole("row").filter({ has: textlocator });
    await expect(expectedrow.locator("#cell-4-undefined")).toContainText(updateValue);



});