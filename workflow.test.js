const pupp = require('puppeteer');
const arrayData = require('./test.json')

require('dotenv').config();

    let browser
    // let page
    // let hidden = []
    // let rfiResponse
    // let radio
    // let file
    // let dropdowns
    // let number
    // let questionArray = []
    // let parentChildRevealArray
    // let surveyId 
    // let surveyTypeId
    describe('Survey Tests', ()=>{
        jest.setTimeout(100000)
        beforeAll(async() =>{
            browser = await pupp.launch({ headless: true });
            const page = await browser.newPage()
            page.on('dialog', async(event) =>{
                return event.accept()
            })
            await page.goto('http://localhost:8080/#/auth/login');
            await page.click('#email');
            await page.keyboard.type(process.env.USERNAME);
            await page.click('#password');
            await page.keyboard.type(process.env.PASSWORD);
            await page.click('#enter');
            await page.waitFor('#modules');
            await page.click('#modules');
            // await page.waitFor(`[id="${process.env.SURVEY_TYPE_ID}"]`)
            await page.waitFor(1000);
            await page.click(`[id="${process.env.SURVEY_TYPE_ID}"]`)
            // await page.waitFor(`[id="${process.env.SURVEY_ID}"]`)
            await page.waitFor(1000);
            await page.click(`[id="${process.env.SURVEY_ID}"]`)
            await page.waitFor("#cdk-describedby-message-container");
            await page.click('#reset_answers')
    })
    arrayData.forEach(async(el) => {
        it('will verify if hidden questions are available',async() =>{
            let result = await page.evaluate((questionId) => {
                return document.querySelector('#' + questionId)
            }, el.id)
            await expect(result).toBeTruthy()
        })
    })

    afterAll(()=>{
        browser.close()
    })
})
