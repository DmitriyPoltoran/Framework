const { expect } = require('chai');
const DriverSingleton = require("../driver/Driver");

const { TESTCASE_TIMEOUT } = require("../utils/constants");

const TestDataReader = require('../services/TestDataReader');
const SneakersPage = require('../pages/SneakersPage');
const { makeScreenshot } = require('../utils/utils');
const logger = require('../logger/logger');


describe('Testing prices filter.', () =>
{
    before(async function () 
    {
        const sneakersProperties = await TestDataReader.getTestData("sneakers.properties");
        for (const key in sneakersProperties)
        {
            this[key] = sneakersProperties[key];
        }
        this.driver = await DriverSingleton.createDriver();
    });

    it('Prices should be in descending order.', async function () 
    {
        const sneakersPage = new SneakersPage(this.driver);
        await sneakersPage.openPage(this.priceDownUrl);

        const prices = await sneakersPage.getPrices();

        expect(prices).to.eql(sneakersPage.getSortedPrices(prices, 'descending'));


    }).timeout(TESTCASE_TIMEOUT);

    it('Prices should be in increase order.', async function () 
    {
        const sneakersPage = new SneakersPage(this.driver);
        await sneakersPage.openPage(this.priceUpUrl);


        const prices = await sneakersPage.getPrices();

        expect(prices).to.eql(sneakersPage.getSortedPrices(prices, 'increase'));
        console.log(await this.driver.getCurrentUrl())

    }).timeout(TESTCASE_TIMEOUT);

    afterEach(async function () 
    {
        if (this.currentTest.state !== "passed")
        {
            logger.error(`Error in ${this.currentTest.title}`)
            await makeScreenshot(this.driver, this.currentTest.title)
        }
    });


    after(async function () 
    {
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
