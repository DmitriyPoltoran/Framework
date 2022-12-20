const logger = require("../logger/logger");
const { parsePrice } = require("../utils/utils");
const BasePage = require("./basePage");

const pricesLocator = `//p[@data-component='Price']`
const colourLocator = `//p[@data-testid='colourHeader']`
const whiteLocator = `//span[@class='ltr-ptshqh eg6eksn2']`
const blackLocator = `//span[@class='ltr-18dd6dt eg6eksn2']`
const greyLocator = `//span[@class='ltr-p74czq eg6eksn2']`
const brownLocator = `//span[@class='ltr-17567kv eg6eksn2']`
const greenLocator = `//span[@class='ltr-1ep52yo eg6eksn2']`
class SneakersPage extends BasePage
{
    getSortedPrices(prices, order)
    {
        logger.info(`Sort prices by ${order}`)
        switch (order)
        {
            case 'descending': return prices.sort((a, b) => b - a)
            case 'increase': return prices.sort((a, b) => a - b)
            default: logger.error(`Invalid order ${order}`); break;
        }
    }

    async getPrices()
    {
        logger.info('Get prices')
        const items = await this.findAllByXpath(pricesLocator);
        const prices = []
        for (let i = 0; i < items.length; i++)
        {
            prices.push(parsePrice(await this.getItemText(items[i])))
        }

        return prices;
    }

    async openColoursList() 
    {
        logger.info('Open colours list')
        const button = await this.findByXpath(colourLocator)
        await this.driver.executeScript("arguments[0].scrollIntoView(true);", button);
        await button.click()
    }

    async chooseColour(colour)
    {
        logger.info(`Choose colour: ${colour}`)
        let button
        switch (colour)
        {
            case 'white':
                button = await this.findByXpath(whiteLocator)
                await button.click()
                break;
            case 'black':
                button = await this.findByXpath(blackLocator)
                await button.click()
                break;
            case 'grey':
                button = await this.findByXpath(greyLocator)
                await button.click()
                break;
            case 'brown':
                button = await this.findByXpath(brownLocator)
                await button.click()
                break;
            case 'green':
                button = await this.findByXpath(greenLocator)
                await button.click()
                break;
        }
        await this.driver.sleep(5000)
    }

    async getUrl() 
    {
        logger.info('Get current url')
        return await this.driver.getCurrentUrl()
    }

}

module.exports = SneakersPage;