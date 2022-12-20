const logger = require("../logger/logger");
const BasePage = require("./BasePage");
const CartPage = require("./cartPage");

const itemPriceLocator = `//p[@class='ltr-194u1uv-Heading e54eo9p0']`
const itemDescriptionLocator = `//p[@class='ltr-13ze6d5-Body efhm1m90']`
const itemIDLocator = `//p[@class='ltr-4y8w0i-Body e1s5vycj0'][contains(text(),'Артикул FARFETCH: ')]//span`
const buttonAddToCartLocator = `//button[@data-tstid='addToBag']`
const buttonGoToCartLocator = `//a[@data-tstid='addToBag']`


class WatchPage extends BasePage
{
    async getItemID()
    {
        logger.info('Get watch id')
        return await this.getItemText(await this.findByXpath(itemIDLocator))
    }

    async getItemDescription()
    {
        logger.info('Get watch description')
        return await this.getItemText(await this.findByXpath(itemDescriptionLocator))
    }

    async getItemPrice()
    {
        logger.info('Get watch price')
        return await this.getItemText(await this.findByXpath(itemPriceLocator))
    }


    async addToCart()
    {
        logger.info('Add watch to the cart')
        let button = await this.findByXpath(buttonAddToCartLocator);
        await button.click();
        button = await this.findByXpath(buttonGoToCartLocator);
        await button.click();

        return new CartPage(this.driver)
    }
}

module.exports = WatchPage;