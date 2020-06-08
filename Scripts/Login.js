//import { browser } from "protractor";

const data = require("../DataSource/TestData.json")
const loginPageObject = require('../PageObjects/CRMLoginPOM')
const baseClass = require('../Utilities/BaseClass');

describe('Login checkin', () => {

    it('should login', () => {
        baseClass.navigateToHome('https://demo.civihrhosting.co.uk/welcome-page');
        loginPageObject.giveUserName(data.loginCred.userName);
        loginPageObject.giveUserPass(data.loginCred.userPassword);
        loginPageObject.clickLoginButton();
        browser.sleep(30000)
    })
});