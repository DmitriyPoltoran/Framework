const logger = require("../logger/logger");
const BasePage = require("./BasePage");

const brandItemsLocator = `//p[@data-component='ProductCardBrandName']`


class ItemsPage extends BasePage
{

    async getBrandItems()
    {
        logger.info('Get list of brand items')
        const items = await this.findAllByXpath(brandItemsLocator);
        const products = []
        for (let i = 0; i < items.length; i++)
        {
            products.push(await this.getItemText(items[i]))
        }

        return products;
    }


}

module.exports = ItemsPage;
