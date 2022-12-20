const { expect } = require('chai');
const DriverSingleton = require("../driver/Driver");
const { TESTCASE_TIMEOUT } = require("../utils/constants");

const TestDataReader = require('../services/TestDataReader');
const SneakersPage = require('../pages/SneakersPage');
const { makeScreenshot } = require('../utils/utils');
const logger = require('../logger/logger');


describe('Testing colours filter.', () =>
{
    before(async function ()
    {
        const coloursProperties = await TestDataReader.getTestData("colours.properties");
        for (const key in coloursProperties)
        {
            this[key] = coloursProperties[key];
        }
        const sneakersProperties = await TestDataReader.getTestData("sneakers.properties");
        for (const key in sneakersProperties)
        {
            this[key] = sneakersProperties[key];
        }

    });

    beforeEach(async function () 
    {
        this.driver = await DriverSingleton.createDriver();
    });

    it('Color should be white.', async function () 
    {
        const sneakersPage = new SneakersPage(this.driver);
        await sneakersPage.openPage(this.sneakersPageUrl);

        await sneakersPage.openColoursList()

        await sneakersPage.chooseColour('white');

        const url = await sneakersPage.getUrl()

        expect(url).to.contain(this.sneakersPageUrl + '&' + this.white)

    }).timeout(TESTCASE_TIMEOUT);

    it('Color should be black.', async function () 
    {
        const sneakersPage = new SneakersPage(this.driver);
        await sneakersPage.openPage(this.sneakersPageUrl);

        await sneakersPage.openColoursList()

        await sneakersPage.chooseColour('black');

        const url = await sneakersPage.getUrl()

        expect(url).to.contain(this.sneakersPageUrl + '&' + this.black)

    }).timeout(TESTCASE_TIMEOUT);
    it('Color should be grey.', async function () 
    {
        const sneakersPage = new SneakersPage(this.driver);
        await sneakersPage.openPage(this.sneakersPageUrl);

        await sneakersPage.openColoursList()

        await sneakersPage.chooseColour('grey');

        const url = await sneakersPage.getUrl()

        expect(url).to.contain(this.sneakersPageUrl + '&' + this.grey)

    }).timeout(TESTCASE_TIMEOUT);
    it('Color should be brown.', async function ()
    {
        const sneakersPage = new SneakersPage(this.driver);
        await sneakersPage.openPage(this.sneakersPageUrl);

        await sneakersPage.openColoursList()

        await sneakersPage.chooseColour('brown');

        const url = await sneakersPage.getUrl()

        expect(url).to.contain(this.sneakersPageUrl + '&' + this.brown)

    }).timeout(TESTCASE_TIMEOUT);
    it('Color should be green.', async function () 
    {
        const sneakersPage = new SneakersPage(this.driver);
        await sneakersPage.openPage(this.sneakersPageUrl);

        await sneakersPage.openColoursList()

        await sneakersPage.chooseColour('green');

        const url = await sneakersPage.getUrl()

        expect(url).to.contain(this.sneakersPageUrl + '&' + this.green)

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
