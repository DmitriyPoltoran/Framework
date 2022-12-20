const BasePage = require("./BasePage");
const logger = require("../logger/logger");


const itemPriceLocator = `//p[@data-testid='item-regularPrice']`
const itemDescriptionLocator = `//a[@data-testid='item-description']`
const itemIDLocator = `//p[@class='_b1d204 ltr-1gp3mca-Footnote e1s5vycj0']/*[2]`
const removeItemLocator = `//button[@data-testid='item-remove']`
const emptyCartTextLocator = `//div[@data-testid='infoBlock']//p[1]`


class CartPage extends BasePage
{

    async getItemID()
    {
        logger.info('Get Item Id')
        return await this.getItemText(await this.findByXpath(itemIDLocator))
    }

    async getItemDescription()
    {
        logger.info('Get Item description')
        return await this.getItemText(await this.findByXpath(itemDescriptionLocator))
    }

    async getItemPrice()
    {
        logger.info('Get Item price')
        return await this.getItemText(await this.findByXpath(itemPriceLocator))
    }

    async deleteItem() 
    {
        logger.info('Delete Item from cart')
        const button = await this.findByXpath(removeItemLocator)
        await button.click()
        return this;
    }

    async getEmptyCartMessage()
    {
        logger.info('Get emtpy cart message')
        return await this.getItemText(await this.findByXpath(emptyCartTextLocator))
    }


}
module.exports = CartPage;
