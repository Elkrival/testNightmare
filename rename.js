// const Nightmare = require('nightmare');
// const chai = require('chai');
// const expect = chai.expect
// const nightmare = new Nightmare({ show: true, openDevTools: { mode: 'detach' }})

// /* ----------------Variables for scrolling  */
// let top 
// let left
// nightmare.on('page', function (type="confirm", message){
//     return true
// })
// .goto('http://localhost:8080/#/auth/login')
// .type('#email', 'ivan@sourcemap.com')
// .type('#password', 'Haze!20!')
// .click('#enter')
// .wait("[id='test']")
// .click("[id='test']")
// .wait('body > app > main > group-rfis > div > div > div > div.ng-star-inserted > p-datatable > div > div.ui-datatable-scrollable-wrapper.ui-helper-clearfix.max-height.ng-star-inserted > div > div.ui-datatable-scrollable-body > div > table > tbody > tr:nth-child(1)')
// .click('body > app > main > group-rfis > div > div > div > div.ng-star-inserted > p-datatable > div > div.ui-datatable-scrollable-wrapper.ui-helper-clearfix.max-height.ng-star-inserted > div > div.ui-datatable-scrollable-body > div > table > tbody > tr:nth-child(1)')
// .click("body > app > main > group-rfis > div > div > div > div.ng-star-inserted > p-datatable > div > div.ui-datatable-scrollable-wrapper.ui-helper-clearfix.max-height.ng-star-inserted > div > div.ui-datatable-scrollable-body > div > table > tbody > tr:nth-child(2) > td:nth-child(2) > span > div")
// .wait('#cdk-describedby-message-container')
// .click("#reset_answers")
// .wait(2000)
// .evaluate(() =>{
//     let question = document.getElementById('questionId_3568234163');
//     console.log(question)
//     let coord = question.getBoundingClientRect();
//     console.log(question.getBoundingClientRect())
//     // window.scrollTo({ top: coord.top, left: coord.left })
//     top = coord.top;
//     left = coord.left;
//     console.log(top);
//     console.log(left)
//     return {
//        top: coord.top,
//        left: coord.left
//     }
// })
// .then(res =>{ 
//     console.log(res)
//     return res
// })
// .then(console.log)
// .catch(e => console.error(e))

// .click("#mat-radio-2 > label > div.mat-radio-container")
// .wait("button.settings-content-btn.blue-btn.mat-raised-button.ng-star-inserted")
// .click("button.settings-content-btn.blue-btn.mat-raised-button.ng-star-inserted")
// .wait('#modules')
// .click('#modules')
// .wait('tbody.ui-datatable-data')

// nightmare.goto('https://duck.com')
// .type('#search_form_input_homepage', 'github nightmare')
// .click('#search_button_homepage')
// .wait('#r1-0 a.result__url')
// .evaluate(() => document.querySelector('#r1-0 a.result__url').href)
// .end()
// .then(res => console.log(res))
// .catch(error => console.error('error', error))