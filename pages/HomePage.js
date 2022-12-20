const BasePage = require("./BasePage");
const SearchResultPage = require("./SearchResultPage");

const { Key } = require("selenium-webdriver");
const logger = require("../logger/logger");
const searchInputButtonLocator = `//input[@class='_e6c43c _a8d3e4']`;

class HomePage extends BasePage
{

    async searchProduct(productName)
    {
        logger.info('Search some products')
        const element = await this.findByXpath(searchInputButtonLocator);
        await element.click();
        await element.sendKeys(productName, Key.ENTER);

        return new SearchResultPage(this.driver)
    }
}

module.exports = HomePage;