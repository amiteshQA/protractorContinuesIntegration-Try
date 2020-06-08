const BaseClass = require('../utilities/BaseClass');
const locators = require('../utilities/Locators');
class Login {

    giveUserName(uName) {
       // locators.findById('edit-name')
        BaseClass.elementSetText('id','edit-name',uName)
    }

    giveUserPass(Upass) {
        BaseClass.elementSetText('id','edit-pass',Upass)
    }

    clickLoginButton() {
        BaseClass.elementClick('id','edit-submit');
    }
}

module.exports = new Login();