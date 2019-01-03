const pupp = require('puppeteer');
require('dotenv').config();

describe('survey questions', async() =>{
    let browser
    let page
    let idList= ['mat-radio-27','mat-radio-29','mat-radio-32','mat-radio-35']
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
    await page.waitFor('[id="5c2d1fdfb75bee74b6154421"]')
    await page.click('[id="5c2d1fdfb75bee74b6154421"]')
    await page.waitFor("[id='5c06c1c8d92248363acf47cf']")
    await page.click('[id="5c06c1c8d92248363acf47cf"]')
    await page.waitFor("#cdk-describedby-message-container");
    await page.click('#reset_answers')
    })
    it('should return true if an answer is selected', async()=>{
        await page.click('#mat-radio-2 > label > div')
        let result = await page.evaluate(() => document.getElementById('mat-radio-2-input').checked);
        await expect(result).toBe(true);
    })
        it('should return falsy if selector is not available', async() =>{
            let result = await page.evaluate(() =>{
                return document.getElementById(id)
            });
            await expect(result).toBeFalsy();
        })
    
    afterAll(async()=>{
        await browser.close()
    })
})