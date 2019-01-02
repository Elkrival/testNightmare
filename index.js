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
    await page.waitFor('[id="5c2d1fdfb75bee74b6154421"]')
    await page.click('[id="5c2d1fdfb75bee74b6154421"]')
    await page.waitFor("[id='5c06c1c8d92248363acf47cf']")
    await page.click('[id="5c06c1c8d92248363acf47cf"]')
    await page.waitFor("#cdk-describedby-message-container");
    await page.click('#reset_answers')
    await page.waitFor(10000)
    await page.waitForSelector('#facility_country');
    await page.click('#facility_country')
    await page.waitFor(2000);
    await page.click("#mat-option-99 > span.mat-option-text");
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