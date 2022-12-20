const BasePage = require("./basePage");
const ItemsPage = require("./ItemsWithParticularBrandPage")
const logger = require("../logger/logger");

const brandLinkLocator = `//a[@data-test='T-link']`
const brandLocator = `//a[@name='dca8519']`


class BrandsPage extends BasePage
{

    async getBrandName()
    {
        logger.info('Get Brand Name.')
        return await this.getItemText(await this.findByXpath(brandLocator))
    }

    async goToBrand()
    {
        logger.info('Go to particular brand.')
        const button = await this.findByXpath(brandLinkLocator);
        button.click()
        return this;
    }


    async clickBrandButon()
    {
        logger.info('Click brand button')
        const button = await this.findByXpath(brandLocator);
        await button.click();

        return new ItemsPage(this.driver);
    }
}

module.exports = BrandsPage;
