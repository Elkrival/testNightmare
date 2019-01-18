const pupp = require('puppeteer');
const arrayData = require('./test.json')

require('dotenv').config();

    let browser
    let page
    const { hidden, radio, dropdowns, file, text, questionArray, parentChildRevealArray } = arrayData;
    describe('questionArray', () =>{
        test('will always be greater than hidden question array', async() =>{
            await expect(questionArray.length).toBeGreaterThan(hidden.length)
        })
        test('will always be greater than radio questions array', async() =>{
            await expect(questionArray.length).toBeGreaterThan(radio.length)
        })
        test('will always be greater than dropdowns questions array', async() =>{
            await expect(questionArray.length).toBeGreaterThan(dropdowns.length)
        })
        test('will always be greater than file questions array', async() =>{
            await expect(questionArray.length).toBeGreaterThan(file.length)
        })
        test('will always be greater than text questions array', async() =>{
            await expect(questionArray.length).toBeGreaterThan(text.length)
        })
        test('will always be greater than radio questions array', async() =>{
            await expect(questionArray.length).toBeGreaterThan(radio.length)
        })
        questionArray.forEach(async(question) =>{
            test('will have a property of type', async() =>{
                await expect(question).toHaveProperty('type')
            })
            test('type will be a string', async() =>{
                await expect(typeof question.type).toBe('string')
            })
            test('will have property of style', async() =>{
                await expect(question).toHaveProperty('style')
            })
            test('style property will contain a class', async() =>{
                await expect(question.style).toMatch('class');
            })
        })
    })
    describe('hidden question array', () =>{
        hidden.forEach(async(question) =>{
            test('question will have property hidden', async() =>{
                await expect(question).toHaveProperty('hidden')
            })
            test('hidden property of question will be true', async() =>{
                await expect(question.hidden).toEqual(true)
            })
            test('question will always have a revealed property', async() =>{
                await expect(question).toHaveProperty('revealed')
            })
        })
    })
    describe('radio questions', ()=>{
        radio.forEach(async(question) =>{
            test('question type will equal radiooptions', async() =>{
                await expect(question.type).toEqual('radiooptions')
            })
        })
    })
    describe('text questions', () =>{
        text.forEach(async(question) =>{
            await expect(question.type).toEqual('text');
        })
    })
    describe('dropdown questions', () =>{
        dropdowns.forEach(async(question) =>{
            let options = Object.keys(question.options)
            test('question will have type of', async() =>{
                await expect(question.type).toEqual('dropdown')
            })
            test('question will have options with a length greater than 1', async() =>{
                await expect(options.length).toBeGreaterThanOrEqual(1)
            })
            options.forEach(async(key) =>{
                test('dropdown options will have property value', async() =>{
                    await expect(question.options[key]).toHaveProperty('value')
                })
                test('dropdown options will have property display', async() =>{
                    await expect(question.options[key]).toHaveProperty('display')
                })
            })
        })
    })
    describe('Survey Tests', ()=>{
        jest.setTimeout(30000)
        beforeAll(async() =>{
            browser = await pupp.launch({ headless: true });
            page = await browser.newPage()
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
    hidden.forEach(async(el) => {
        it('will verify if hidden questions have rendered',async() =>{
            let result = await page.evaluate((questionId) => {
                return document.querySelector('#' + questionId)
            }, el.id)
            await expect(result).toBeFalsy()
        })
    })

    afterAll(()=>{
        browser.close()
    })
})
