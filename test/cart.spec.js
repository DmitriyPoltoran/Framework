const { expect } = require('chai');
const DriverSingleton = require("../driver/Driver");

const WatchPage = require("../pages/WatchPage");
const { TESTCASE_TIMEOUT } = require("../utils/constants");

const TestDataReader = require('../services/TestDataReader');
const CartPage = require('../pages/cartPage');
const logger = require('../logger/logger');
const { makeScreenshot } = require('../utils/utils');


describe('Add items to bag test.', () =>
{
    before(async function () 
    {
        this.driver = await DriverSingleton.createDriver();

        const watchPropertees = await TestDataReader.getTestData("watch.properties");
        for (const key in watchPropertees)
        {
            this[key] = watchPropertees[key];
        }

        const cartProperties = await TestDataReader.getTestData("cart.properties");
        for (const key in cartProperties)
        {
            this[key] = cartProperties[key];
        }
    });


    it('Should add item to the cart.', async function () 
    {
        const watchPage = new WatchPage(this.driver);
        await watchPage.openPage(this.watchPageUrl);

        const itemID = await watchPage.getItemID();
        const itemDescription = await watchPage.getItemDescription();
        const itemPrice = await watchPage.getItemPrice();

        const cartPage = await watchPage.addToCart();

        const itemIdInCart = await cartPage.getItemID();
        const itemDescriptionInCart = await cartPage.getItemDescription();
        const itemPriceInCart = await cartPage.getItemPrice();

        expect(itemID).to.contain(itemIdInCart);
        expect(itemDescription).to.contain(itemDescriptionInCart);
        expect(itemPrice).to.contain(itemPriceInCart);

    }).timeout(TESTCASE_TIMEOUT);

    it('Should delete item to the cart.', async function () 
    {
        const cartPage = new CartPage(this.driver);
        await cartPage.deleteItem();

        expect(this.emptyCartMessage).to.contain(await cartPage.getEmptyCartMessage());

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
