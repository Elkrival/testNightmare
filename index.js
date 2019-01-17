const pupp = require('puppeteer');
const parentChildReveal = require('./response_helpers');
const dynamicQuestionFilter = require('./question_filters');
const fs = require('fs');
require('dotenv').config();
const events = [
    'dialog',
    'request',
    'response'
]
let hidden;
let radio;
let questionArray=[]
let file;
let dropdowns;
let number;
let parentChildRevealArray;
let browser
async function initScrape(){
    browser = await pupp.launch({ headless: true });
    const page = await browser.newPage()
    await page.setViewport({ width: 1280, height: 1307 })
    events.forEach(eventType => {
        page.on(eventType, async (eventFilterFunc)=>{
        if(eventType === 'dialog') {
            return eventFilterFunc.accept()
        }
        else if(eventType === 'response') {
            if(eventFilterFunc.url().includes('rfis/answers/') && !eventFilterFunc.url().includes('rfis/answers/templates')) {
                let rfiResponse = await eventFilterFunc.json().then(res => res).catch(e => console.error(e.message))
                if(rfiResponse.hasOwnProperty('pages') && Array.isArray(rfiResponse.pages) && rfiResponse.pages.length > 0){
                    let components = await rfiResponse.pages.map(el => el.components)
                    await components.forEach((el) => {
                        for (const element in el) {
                            questionArray.push(el[element])
                        }
                    })
                    questionArray.sort((a,b) => a.position - b.position);  
                    hidden = await dynamicQuestionFilter(questionArray, 'hidden');
                    
                    fs.writeFile('test.json',JSON.stringify(hidden, null, 2), 'utf-8', function(err){
                        if(err) {
                            console.error(err.message, 'there was an error')
                        }
                        else{
                            console.log('wrote data on a file')
                        }
                    })
                    radio = await dynamicQuestionFilter(questionArray,'radio');
                    file = await dynamicQuestionFilter(questionArray, 'file');
                    dropdowns = await dynamicQuestionFilter(questionArray, 'dropdown');
                    number = await dynamicQuestionFilter(questionArray, 'text');
                    
                    parentChildRevealArray = await parentChildReveal(questionArray, hidden);
                }
                else {
                    console.log('ಠ_ಠ ¯\_(ツ)_/¯ Nothing To See here ¯\_(ツ)_/¯ಠ_ಠ')
                }
            }
        }
    })
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
    questionArray = []
    // await page.waitFor(7000)
    // await page.waitForSelector('#facility_country');
    // await page.click('#facility_country')
    // await page.waitFor(2000);
    // await page.click("#mat-option-99 > span.mat-option-text");
    // await page.waitFor(2000);
    // await page.click("#mat-radio-2 > label > div ");
    // await page.waitFor(2000);
    // await page.click("#mat-radio-27 > label > div");
    // await page.waitFor(1000);
    // await page.click("#mat-radio-29 > label > div");
    // await page.waitFor(1000);
    // await page.click("#mat-radio-32 > label > div");
    // await page.waitFor(1000);
    // await page.click("#mat-radio-35 > label > div");
    // await page.waitFor(1000);
    // await page.click("#mat-radio-38 > label > div");
    // await page.waitFor(1000);
    // await page.click('#questionId_global_2_1 > div button');
    // await page.waitFor(2000);
    // let input = await page.$('#fsp-fileUpload');
    // await input.uploadFile(process.env.FILE)
    // await page.waitFor(2000);
    // await page.click('#__filestack-picker > div > div > div.fsp-modal > div.fsp-modal__body > div.fsp-content.fsp-content--selected-items > div > div.fsp-summary__body > div.fsp-footer.fsp-footer--appeared > div > span.fsp-footer__nav--right');
    // await page.waitFor(2000);
    // let global3 = await page.evaluate(() => document.querySelector('#global_3').children[0].id);// This is a test for radio selectors on isolating our 
    // await page.waitFor(1000);
    // await page.click('#' + global3 + '> label > div');
    // await page.waitFor(1000);
    // await page.click("#mat-radio-41 > label > div");
    // await page.waitFor(500);
    // await page.click("#mat-radio-44 > label > div");
    // await page.waitFor(500);
    // await page.click("#mat-radio-47 > label > div");
    // await page.waitFor(500);
    // await page.click("#mat-radio-50 > label > div");
    // await page.waitFor(500);
    // await page.click('#questionId_global_3_1 > div button');
    // await page.waitFor('#fsp-fileUpload');
    // input = await page.$('#fsp-fileUpload');
    // await input.uploadFile(process.env.FILE)
    // await page.waitFor(2000);
    // await page.click('#__filestack-picker > div > div > div.fsp-modal > div.fsp-modal__body > div.fsp-content.fsp-content--selected-items > div > div.fsp-summary__body > div.fsp-footer.fsp-footer--appeared > div > span.fsp-footer__nav--right');
    // await page.waitFor(1000);
    // await page.click('#mat-radio-15 > label > div');
    // await page.waitFor(1000);
    // await page.click('#mat-radio-8 > label > div');
    // await page.waitFor(1000);
    // await page.click('#mat-radio-11 > label > div');
    // await page.waitFor(1000);
    // await page.click('#mat-slide-toggle-1 > label');
    // await page.waitFor(1000);
    // await page.click('#mat-radio-17 > label > div');
    // await page.waitFor(1000);
    // await page.click('#mat-radio-53 > label > div');
    // await page.waitFor(1000);
    // await page.click('#mat-radio-57 > label > div');
    // await page.waitFor(2000);
    // await page.click('#mat-radio-59 > label > div');
    // await page.waitFor(1000);
    // await page.click('#mat-radio-62 > label > div');
    // await page.waitFor(1000);
    // await page.click('#mat-radio-65 > label > div');
    // await page.waitFor(1000);
    // await page.click('#mat-radio-68 > label > div');
    // await page.waitFor(1000);
    // await page.click('#mat-radio-71 > label > div');
    // await page.waitFor(1000);
    // await page.click('#mat-radio-74 > label > div');
    // await page.waitFor(1000);
    // await page.click('#mat-radio-77 > label > div');
    // await page.waitFor(1000);
    // await page.click('#questionId_foot_7_a > div button');
    // await page.waitFor(1000);
    // input = await page.$('#fsp-fileUpload');
    // await page.waitFor(1000);
    // await input.uploadFile(process.env.FILE)
    // await page.waitFor(1000)
    // await page.click('#__filestack-picker > div > div > div.fsp-modal > div.fsp-modal__body > div.fsp-content.fsp-content--selected-items > div > div.fsp-summary__body > div.fsp-footer.fsp-footer--appeared > div > span.fsp-footer__nav--right');
    // await page.waitFor(3000);
    // await page.click('#mat-slide-toggle-2 > label');
    // await page.waitFor(1000);
    // await page.click('#mat-radio-20 > label > div');
    // await page.waitFor(1000);
    // await page.click('#fin_1')
    // await page.waitFor(2000);
    // await page.click("#mat-option-256 > span.mat-option-text");
    // await page.waitFor(1000);
    // await page.click('#fin_2')
    // await page.waitFor(2000);
    // await page.click("#mat-option-266 > span.mat-option-text");
    // await page.waitFor(1000)
    // await page.click('#mat-checkbox-2 > label > div');
    // await page.waitFor(1000);
    // await page.click('#mat-checkbox-1 > label > div');
    // await page.waitFor(1000);
    // await page.click("[id='fin_4']");
    // await page.keyboard.type('5');
    // await page.waitFor(1000);
    // await page.click("[id='fin_5']");
    // await page.keyboard.type('5');
    // await page.waitFor(1000);
    // await page.click('#mat-radio-81 > label > div');
    // await page.waitFor(1000);
    // await page.click('#mat-radio-92 > label > div');
    // await page.waitFor(1000);
    // await page.click('#mat-radio-83 > label > div');
    // await page.waitFor(1000);
    // await page.click('#mat-radio-86 > label > div');
    // await page.waitFor(1000);
    // await page.click('#mat-radio-89 > label > div');
    // await page.waitFor(3000);
    // await page.click('#mat-slide-toggle-3 > label');
    // await page.waitFor(1000);
    // await page.click('#mat-radio-24 > label > div');
    // await page.waitFor(1000);
    // await page.click('#mat-slide-toggle-4 > label');
    // await page.waitFor(1000);
    // await page.click('#mat-radio-27 > label > div');
    // await page.waitFor(1000);
    // await page.click('#mat-slide-toggle-5 > label');
    // await page.waitFor(10000);
    await browser.close()
};
initScrape()