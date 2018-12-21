const pupp = require('puppeteer');
require('dotenv').config();

async function startScrape(){
    const browser = await pupp.launch({ headless: false });
    const page = await browser.newPage()
    await page.setViewport({ width: 800, height:  1080 })
    page.on('dialog', async (msg)=>{
       return msg.accept()
    })
    await page.goto('http://localhost:8080/#/auth/login');
    await page.click('#email');
    await page.keyboard.type(process.env.USERNAME);
    await page.click('#password');
    await page.keyboard.type(process.env.PASSWORD);
    await page.click('#enter');
    await page.waitFor('#modules');
    await page.click('#modules');
    await page.waitFor('body > app > main > group-rfis > div > div > div > div.ng-star-inserted > p-datatable > div > div.ui-datatable-scrollable-wrapper.ui-helper-clearfix.max-height.ng-star-inserted > div > div.ui-datatable-scrollable-body > div > table > tbody > tr:nth-child(2)');
    await page.click('[id="5c1a9f2448e9c94b7d83a4f5"]')
    await page.waitFor("[id='5bfffa05464f0d276cc078e9']")
    await page.click('[id="5bfffa05464f0d276cc078e9"]')
    await page.waitFor("#cdk-describedby-message-container");
    await page.click('#reset_answers')
    await page.waitFor(10000)
    await page.waitForSelector('#mat-radio-135');
    await page.click('#mat-radio-135 > label > div')
    await page.waitFor(2000);
    await page.click('#mat-checkbox-3 > label > div');
    await page.waitFor(2000);
    await page.click("[id='213190_findings']");
    await page.keyboard.type('Best Farms Ever');
    await page.click("#mat-radio-2 > label > div ");
    await page.waitFor(2000);
    await page.click('#mat-dialog-0 > rfi-confirm > div > div:nth-child(3) > button.settings-content-btn.blue-btn.mat-raised-button.ng-star-inserted')
    await page.waitFor(2000);
    await page.click('#mat-slide-toggle-1 > label > div');
    await page.waitFor(1000);
    await page.click('#mat-radio-11 > label > div');
    await page.waitFor(1000);
    await page.click('[id="213280"]');
    await page.waitFor(500)
    await page.keyboard.type('34');
    await page.click('[id="213280_findings"]');
    await page.keyboard.type('We found the number of employees')
    await page.waitFor(2000);
    await browser.close();
};

startScrape();