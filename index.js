const pupp = require('puppeteer');


async function startScrape(){
    const browser = await pupp.launch({ headless: false, devtools: true });
    const page = await browser.newPage()
    page.on('dialog', async (msg)=>{
       return msg.accept()
    })
    await page.goto('http://localhost:8080/#/auth/login');
    await page.click('#email');
    await page.keyboard.type('ivan@sourcemap.com');
    await page.click('#password');
    await page.keyboard.type('Haze!20!');
    await page.click('#enter');
    await page.waitFor('#test');
    await page.click('#test');
    await page.waitFor('body > app > main > group-rfis > div > div > div > div.ng-star-inserted > p-datatable > div > div.ui-datatable-scrollable-wrapper.ui-helper-clearfix.max-height.ng-star-inserted > div > div.ui-datatable-scrollable-body > div > table > tbody > tr:nth-child(2)');
    await page.click('body > app > main > group-rfis > div > div > div > div.ng-star-inserted > p-datatable > div > div.ui-datatable-scrollable-wrapper.ui-helper-clearfix.max-height.ng-star-inserted > div > div.ui-datatable-scrollable-body > div > table > tbody > tr:nth-child(2)');
    await page.waitFor('body > app > main > group-rfis > div > div > div > div.ng-star-inserted > p-datatable > div > div.ui-datatable-scrollable-wrapper.ui-helper-clearfix.max-height.ng-star-inserted > div > div.ui-datatable-scrollable-body > div > table > tbody > tr:nth-child(3) > td:nth-child(2) > span > div')
    await page.click('body > app > main > group-rfis > div > div > div > div.ng-star-inserted > p-datatable > div > div.ui-datatable-scrollable-wrapper.ui-helper-clearfix.max-height.ng-star-inserted > div > div.ui-datatable-scrollable-body > div > table > tbody > tr:nth-child(3)')
    await page.waitFor("#cdk-describedby-message-container");
    await page.click('body > app > main > rfi-answers-detail > div > div.rfi-right-side > div > div > button:nth-child(2) > div.mat-button-ripple.mat-ripple');
    await page.waitFor(10000)
    await page.click('#questionId_3568234163');
};

startScrape()