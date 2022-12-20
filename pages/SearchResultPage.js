const logger = require("../logger/logger");
const BasePage = require("./BasePage");

const selectInvalidTextLocator = `//p[@class='ltr-4y8w0i-Body e1s5vycj0'][@data-testid='header-title']`
const selectValidTextLocator = `//div[@class='e15t9ylp2 ltr-3seki5 e1e8ldf00']`
const closePopupLocator = `//button[@class='_d6a264 ltr-17ka3l3 _e1775c _a58813 _c5df4d']`

class SearchResultsPage extends BasePage
{

    async getSelectValidText()
    {
        logger.info('Get selected valid text')
        const element = await this.findByXpath(selectValidTextLocator);
        const elementText = await this.getItemText(element);

        return elementText;
    }

    async getSelectInvalidText()
    {
        logger.info('Get selected invalid text')
        const element = await this.findByXpath(selectInvalidTextLocator);
        const elementText = await this.getItemText(element);

        return elementText;
    }

    async closePopup()
    {
        logger.info('Close popup')
        const button = await this.findByXpath(closePopupLocator);
        await button.click();
    }

}

module.exports = SearchResultsPage;