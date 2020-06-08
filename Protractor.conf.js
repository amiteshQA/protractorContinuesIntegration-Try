const HtmlReporter = require('protractor-beautiful-reporter');
const SpecReporter = require('jasmine-spec-reporter').SpecReporter;
const log4js = require('log4js');

// Connecting directing to the conf file
exports.config = {
    directConnect: true,
    // Capabilities to be passed to the webdriver instance.
    capabilities: {
        'browserName': 'chrome',
        //'marionette': true
    },

    // Framework to use. Jasmine is recommended.
    framework: 'jasmine2',
    // Spec patterns are relative to the current working directory when protractor is called.

    allScriptsTimeout: 32000,


    /**
     * oem sync
     */
    //specs: [scriptsLocation+'oemSync/newSpecialOemSync.script.js'],

    /**
     * Finance and Trade button
     */
      //specs: [scriptsLocation+'pages/tradeButtonVerification.script.js'],
     //specs: [scriptsLocation+'pages/tradeButtonVerification.script.js'],

    /**
     * all specials and pages
     */
    specs:['./Scripts/Login.js'],

    // Options to be passed to Jasmine.
    jasmineNodeOpts: {
        showColors: true,
        stopSpecOnExpectationFailure: true,
        defaultTimeoutInterval: 120000,
        includeStackTrace: true,
        allScriptsTimeout: 20000,
        isVerbose: true
    },

    beforeLaunch: function () {
        /**
         * configuration for logger
         */
        log4js.configure({
            appenders: {
                out: {
                    type: 'file', filename: './end-to-end-test/executionLog/executionLogs.log', layout: {
                        type: 'pattern',
                        pattern: '%d{MM/dd/yyyy-hh:mm} %p %c  %m'
                    }
                }
            },
            categories: {default: {appenders: ['out'], level: 'trace'}}
        });
    },

    // on initial environment is set where reports are added.
    onPrepare: function () {
          browser.driver.fullscreen();
        //browser.driver.manage().window().maximize();
        //browser.driver.manage().window().setSize(1600, 800);

        //initialize the logger configuration
        browser.logger = log4js.getLogger('protractorLogger');

        browser.logger.info("********************** New Session **********************");

        //printing the OS and browser in logs
        browser.driver.getCapabilities().then((capabilities) => {
            let nameOfBrowser = browser.browserName = capabilities.get('browserName');
            browser.logger.info("############Browser name: " + nameOfBrowser + " ################");
            let nameOfOs = browser.platform = capabilities.get('platform');
            browser.logger.info("############OS name: " + nameOfOs + " ##################");
        });

        jasmine.getEnv().addReporter(new HtmlReporter({
            baseDirectory: 'results/report'
        }).getJasmine2Reporter());

        let path = require('path');
        new HtmlReporter({
            baseDirectory: 'results/report'
            , preserveDirectory: false
            , cssOverrideFile: 'css/style.css'
            , takeScreenShotsForSkippedSpecs: false
            , jsonsSubfolder: 'jsons'
            , takeScreenShotsOnlyForFailedSpecs: true
            , gatherBrowserLogs: true
            , columnSettings: {
                displayTime: true,
                displayBrowser: true,
                displaySessionId: true,
                inlineScreenshots: false
            }
            , pathBuilder: function pathBuilder(spec, descriptions, results, capabilities) {
                // Return '<browser>/<specname>' as path for screenshots:
                // Example: 'firefox/list-should work'.
                return path.join(capabilities.caps_.browser, descriptions.join('-'));
            }
            , metaDataBuilder: function metaDataBuilder(spec, descriptions, results, capabilities) {
                // Return the description of the spec and if it has passed or not:
                return {
                    description: descriptions.join(' ')
                    , passed: results.passed()
                };
            }
        });
        //this configuration for console report
        jasmine.getEnv().addReporter(new SpecReporter({
            displayFailuresSummary: true,
            displayFailuredSpec: true,
            displaySuiteNumber: true,
            displaySpecDuration: true
        }));

    },

    onComplete: (function (passed) {
        if (passed) {
            console.log('All specs have passed');
            browser.logger.info("############# All specs have passed ##############");
        } else {
            console.log('At least one spec has failed');
            browser.logger.info("############ At least one spec has failed #############");
        }
        browser.logger.info("********************** Session ends **********************");
    }),

};