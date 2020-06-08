//import { browser, protractor } from "protractor";

const locators = require('../Utilities/Locators');
const EC = protractor.ExpectedConditions;
class BaseClass {

    constructor(elementType) {
        this.elementType = elementType;
    }

    navigateToHome(url) {
        browser.ignoreSynchronization = true;
        browser.manage().deleteAllCookies();
        browser.get(url);
    }

    elementSetText(elementType, loctorObject, testData) {
        EC.presenceOf($(loctorObject), 5000, 'Apparently element is not present');
        console.log(typeof (elementType), '#######')
        if (elementType.toLowerCase() === 'id') {
            locators.findById(loctorObject).sendKeys(testData)
        } else if (elementType.toLowerCase() === 'classname') {
            locators.findByClassName(loctorObject).sendKeys(testData)
        } else if (elementType.toLowerCase() === 'xpath') {
            locators.findByXpath(loctorObject).sendKeys(testData)
        } else if (elementType.toLowerCase() === 'buttontext') {
            locators.findByButtonText(loctorObject).sendKeys(testData)
        }
    }

    elementClick(elementType, loctorObject) {
        EC.presenceOf($(loctorObject), 5000, 'Apparently element is not present');
        if (elementType.toLowerCase() === 'id') {
            locators.findById(loctorObject).click();
        } else if (elementType.toLowerCase() === 'classname') {
            locators.findByClassName(loctorObject).click();
        } else if (elementType.toLowerCase() === 'buttontext') {
            locators.findByButtonText(loctorObject).click();
        } else if (elementType.toLowerCase() === 'xpath') {
            locators.findByXpath(loctorObject).click();
        }
    }

    elementSearch(element) {
        $(element).waitForDisplayed(30000);
        if ($(element).isDisplayed()) {
            browser.keys('Enter');
        } else {
            console.log('#####Enter keys did not perform######');
        }
    }


}

module.exports = new BaseClass();