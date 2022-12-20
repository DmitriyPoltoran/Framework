const { expect } = require('chai');
const DriverSingleton = require("../driver/Driver");
const { TESTCASE_TIMEOUT } = require("../utils/constants");
const TestDataReader = require('../services/TestDataReader');
const HomePage = require('../pages/HomePage');
const logger = require('../logger/logger');
const { makeScreenshot } = require('../utils/utils');


describe('Testing product search.', () =>
{
    before(async function ()
    {
        const searchProperties = await TestDataReader.getTestData("search.properties");
        for (const key in searchProperties)
        {
            this[key] = searchProperties[key];
        }
    });

    beforeEach(async function () 
    {
        this.driver = await DriverSingleton.createDriver();
    });

    it('Valid search text.', async function () 
    {
        const homePage = new HomePage(this.driver);
        await homePage.openPage(this.homePageUrl);

        const searchResultPage = await homePage.searchProduct(this.validText)


        await searchResultPage.closePopup();

        const searchResultText = await searchResultPage.getSelectValidText()

        expect(searchResultText).to.contain(this.validSearchResultMessage + `\n'${this.validText.toUpperCase()}'`);

    }).timeout(TESTCASE_TIMEOUT);

    it('Invalid search text.', async function ()
    {
        const homePage = new HomePage(this.driver);
        await homePage.openPage(this.homePageUrl);

        const searchResultPage = await homePage.searchProduct(this.invalidText)
        const searchResultText = await searchResultPage.getSelectInvalidText()

        expect(searchResultText).to.contain(this.invalidSearchResultMessage + ` \'${this.invalidText.toUpperCase()}\'`);

    }).timeout(TESTCASE_TIMEOUT);

    afterEach(async function () 
    {
        if (this.currentTest.state !== "passed")
        {
            logger.error(`Error in ${this.currentTest.title}`)
            await makeScreenshot(this.driver, this.currentTest.title)
        }

        await new Promise((resolve) =>
        {
            setTimeout(async () =>
            {
                resolve();
            }, 100);
        })
        await this.driver.quit();
    })
});
