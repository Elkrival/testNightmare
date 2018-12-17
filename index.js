const Nightmare = require('nightmare');
const chai = require('chai');
const expect = chai.expect
const nightmare = Nightmare({ show: true });

nightmare.goto('http://localhost:8080/#/auth/login')
.type('#email', 'ivan@sourcemap.com')
.type('#password', 'Haze!20!')
.click('#enter')
.wait("[id='test']")
.click("[id='test']")
.wait('body > app > main > group-rfis > div > div > div > div.ng-star-inserted > p-datatable > div > div.ui-datatable-scrollable-wrapper.ui-helper-clearfix.max-height.ng-star-inserted > div > div.ui-datatable-scrollable-body > div > table > tbody > tr:nth-child(1)')
.click('body > app > main > group-rfis > div > div > div > div.ng-star-inserted > p-datatable > div > div.ui-datatable-scrollable-wrapper.ui-helper-clearfix.max-height.ng-star-inserted > div > div.ui-datatable-scrollable-body > div > table > tbody > tr:nth-child(1)')
.click("body > app > main > group-rfis > div > div > div > div.ng-star-inserted > p-datatable > div > div.ui-datatable-scrollable-wrapper.ui-helper-clearfix.max-height.ng-star-inserted > div > div.ui-datatable-scrollable-body > div > table > tbody > tr:nth-child(2) > td:nth-child(2) > span > div")
.wait("#mat-radio-2 > label > div.mat-radio-container")
.click("#mat-radio-2 > label > div.mat-radio-container")
.wait("button.settings-content-btn.blue-btn.mat-raised-button.ng-star-inserted")
.click("button.settings-content-btn.blue-btn.mat-raised-button.ng-star-inserted")
// .wait('#modules')
// .click('#modules')
// .wait('tbody.ui-datatable-data')
.then(console.log)
.catch(e => console.error(e))

// nightmare.goto('https://duck.com')
// .type('#search_form_input_homepage', 'github nightmare')
// .click('#search_button_homepage')
// .wait('#r1-0 a.result__url')
// .evaluate(() => document.querySelector('#r1-0 a.result__url').href)
// .end()
// .then(res => console.log(res))
// .catch(error => console.error('error', error))