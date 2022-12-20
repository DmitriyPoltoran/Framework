const { By, until } = require("selenium-webdriver");
const { FINDING_ELEMENT_TIMEOUT } = require("../utils/constants");

const logger = require("../logger/logger");

class BasePage
{
    constructor(driver)
    {
        this.driver = driver;
    }

    async openPage(url)
    {
        logger.info(`Opening page with url: ${url}.`);
        await this.driver.get(url);

        return this;
    }

    async findByXpath(xpath)
    {
        logger.info("Searching for the element by xpath.");
        return this.driver.wait(until.elementLocated(By.xpath(xpath)), FINDING_ELEMENT_TIMEOUT);
    }

    async getItemText(item) 
    {
        logger.info("Get text value.");
        return await item.getText();
    }

    async findAllByXpath(xpath)
    {
        logger.info("Searching for the elements by xpath.");
        return this.driver.wait(until.elementsLocated(By.xpath(xpath)), FINDING_ELEMENT_TIMEOUT);
    }
}

module.exports = BasePage;