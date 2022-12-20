const { expect } = require('chai');
const BrandsPage = require('../pages/brandsPage');
const TestDataReader = require("../services/TestDataReader");
const { TESTCASE_TIMEOUT } = require("../utils/constants");
const DriverSingleton = require("../driver/Driver");
const logger = require('../logger/logger');
const { makeScreenshot } = require('../utils/utils');

describe('Get items with particular brand', () =>
{
    before(async function ()
    {
        const brandsProperties = await TestDataReader.getTestData("brands.properties");
        for (const key in brandsProperties)
        {
            this[key] = brandsProperties[key];
        }
    });


    beforeEach(async function ()
    {
        this.driver = await DriverSingleton.createDriver();
    });

    it('Should items have particular brand name', async function () 
    {
        const brandsPage = new BrandsPage(this.driver);
        await brandsPage.openPage(this.brandsPageUrl);
        await brandsPage.goToBrand();

        const brandName = await brandsPage.getBrandName();

        const brandsItemsPage = await brandsPage.clickBrandButon()

        expect(await brandsItemsPage.getBrandItems()).to.be.contain(brandName);


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