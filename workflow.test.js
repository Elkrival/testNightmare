const pupp = require('puppeteer');
require('dotenv').config();

describe('survey questions', async() =>{
    let browser
    let page
    // let idList= ['mat-radio-27','mat-radio-29','mat-radio-32','mat-radio-35']
 beforeAll(async() =>{
     jest.setTimeout(100000)
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
    await page.waitForSelector(`[id="${process.env.SURVEY_TYPE_ID}"]`)
    await page.click(`[id="${process.env.SURVEY_TYPE_ID}"]`)
    await page.waitFor(`[id="${process.env.SURVEY_ID}"]`)
    await page.click(`[id="${process.env.SURVEY_ID}"]`)
    await page.waitFor("#cdk-describedby-message-container");
    await page.click('#reset_answers')
    })
    it('should return falsy if selector is not available', async() =>{
        let result = await page.evaluate(() =>{
            return document.querySelector('#mat-radio-27')
        });
        await expect(result).toBeFalsy();
    })
    it('should return true if an answer is selected', async()=>{
        await page.click("#mat-radio-2 > label > div ");
        let result = await page.evaluate(() => {
            document.querySelector('#mat-radio-2-input').checked
        });
        await expect(result).toBe(true);
    })
        
    
    afterAll(async()=>{
        await browser.close()
    })
})