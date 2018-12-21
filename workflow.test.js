const pupp = require('puppeteer');
require('dotenv').config();

describe('survey questions', async() =>{
    let browser
    let page
 beforeAll(async() =>{
     jest.setTimeout(30000)
     browser = await pupp.launch();
     page = await browser.newPage()
    page.on('dialog', async(msg)=>{
        return msg.accept()
    }, 30000)
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
    })
    it('should return true if an answer is selected', async()=>{
        await page.click('#mat-radio-135 > label > div')
        let result = await page.evaluate(() => document.getElementById('mat-radio-135-input').checked);
        await expect(result).toBe(true);
    })
    it('should return null if selector is not available', async() =>{
        let result = await page.evaluate(() =>{
            return document.querySelector('[id="213280"]')
        });
        await expect(result).toBe(null);
    })
    afterAll(async()=>{
        await browser.close()
    })
})