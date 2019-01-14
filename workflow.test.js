const pupp = require('puppeteer');
let chai = require('chai');
let should = chai.should()
let expect = chai.expect
const parentChildReveal = require('./response_helpers');
const dynamicQuestionFilter = require('./question_filters');
require('dotenv').config();

    let browser
    let page
    let hidden = []
    let rfiResponse
    let radio
    let file
    let dropdowns
    let number
    let questionArray = []
    let parentChildRevealArray
    let surveyId 
    let surveyTypeId

describe('Survey Tests',  async()=>{
    before(async() =>{
    const events = [
        'dialog',
        'request',
        'response'
    ]
     jest.setTimeout(90000)
     browser = await pupp.launch();
     page = await browser.newPage()
     await events.forEach(eventType => {
        page.on(eventType, async (eventFilterFunc)=>{
            if(eventType === 'dialog') {
                return eventFilterFunc.accept()
            }
            else if(eventType === 'response') {
                if(eventFilterFunc.url().includes('/rfis/answers/') && !eventFilterFunc.url().includes('rfis/answers/templates')){   
                    await eventFilterFunc.json().then(res => rfiResponse = res).catch(e => console.error(e.message))

                    if(rfiResponse.hasOwnProperty('pages') && Array.isArray(rfiResponse.pages) && rfiResponse.pages.length > 0){
                        let components = await rfiResponse.pages.map(el => el.components)
                        await components.forEach((el) => {
                        for (const element in el) {
                            questionArray.push(el[element])
                            }
                        })
                        questionArray.sort((a,b) => a.position - b.position);  
                        hidden = await dynamicQuestionFilter(questionArray, 'hidden');
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
    await page.waitFor(`[id="${process.env.SURVEY_TYPE_ID}"]`)
    await page.click(`[id="${process.env.SURVEY_TYPE_ID}"]`)
    await page.waitFor(`[id="${process.env.SURVEY_ID}"]`)
    await page.click(`[id="${process.env.SURVEY_ID}"]`)
    await page.waitFor("#cdk-describedby-message-container");
    await page.click('#reset_answers')
    // await hiddenTests(hidden)
    await hidden.forEach(async question => await grr(question))
    })
    await it('should test true for array and length', async() =>{
        await expect(questionArray.length).to.be.equal(0)
    })
    // hidden = dynamicQuestionFilter(questionArray, 'hidden');

        for (let hiddenQuestion = 0; hiddenQuestion < hidden.length; hiddenQuestion++) {
             it('should do this',  ()=>{
                console.log(hidden[hiddenQuestion]);
            })
            await grr(question)
        }

        
    after(async()=>{
        await browser.close()
    })
async function grr(question){
    await describe('hidden questions',async()=>{
        let testQuestion
        console.log('inside')
    await it('should do this', async()=>{
        console.log('inside two')
    })
    })
}
})
