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
    await page.waitFor('#modules');
    await page.click('#modules');
    await page.waitFor('body > app > main > group-rfis > div > div > div > div.ng-star-inserted > p-datatable > div > div.ui-datatable-scrollable-wrapper.ui-helper-clearfix.max-height.ng-star-inserted > div > div.ui-datatable-scrollable-body > div > table > tbody > tr:nth-child(2)');
    await page.click('body > app > main > group-rfis > div > div > div > div.ng-star-inserted > p-datatable > div > div.ui-datatable-scrollable-wrapper.ui-helper-clearfix.max-height.ng-star-inserted > div > div.ui-datatable-scrollable-body > div > table > tbody > tr:nth-child(2)');
    await page.waitFor('body > app > main > group-rfis > div > div > div > div.ng-star-inserted > p-datatable > div > div.ui-datatable-scrollable-wrapper.ui-helper-clearfix.max-height.ng-star-inserted > div > div.ui-datatable-scrollable-body > div > table > tbody > tr:nth-child(3) > td:nth-child(2)')
    await page.click('body > app > main > group-rfis > div > div > div > div.ng-star-inserted > p-datatable > div > div.ui-datatable-scrollable-wrapper.ui-helper-clearfix.max-height.ng-star-inserted > div > div.ui-datatable-scrollable-body > div > table > tbody > tr:nth-child(3) > td:nth-child(2)')
    await page.waitFor("#cdk-describedby-message-container");
    await page.click('body > app > main > rfi-answers-detail > div > div.rfi-right-side > div > div > button:nth-child(2) > div.mat-button-ripple.mat-ripple');
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
    // await page.focus('#mat-radio-135')
    // await page.click('mat-radio-button#mat-radio-135');
    // await page.click('#mat-radio-138-input');

};

startScrape();