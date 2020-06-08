//import { browser, element, by} from "protractor";

class Locators {

    findByClassName(className) {
       return element(by.className(className))
    }

    findById(id) {
        return element(by.id(id))
    }

    findByXpath(xpath) {
        return element(by.xpath(xpath))
    }

    findByButtonText(ButtonText) {
        return element(by.buttonText(ButtonText))
    }
}

module.exports = new Locators();