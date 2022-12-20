const { Builder, Browser } = require("selenium-webdriver");
const capabilities = require('../config/capabilities.json');
const webdriver = require("selenium-webdriver");

const { browser } = require("../config/env");

class DriverSingleton
{
    static driver;

    static async createDriver()
    {
        switch (browser)
        {
            case "chrome":
                this.driver = await this.createRemoteBrowserDriver(Browser.CHROME);
                break;
            case "firefox":
                this.driver = await this.createRemoteBrowserDriver(Browser.FIREFOX);
                break;
            default:
                this.driver = await this.createRemoteBrowserDriver(Browser.CHROME);
        }
        return this.driver;
    }

    static async createLocalBrowserDriver(browser)
    {
        const driver = await new Builder().forBrowser(browser).build();
        await driver.manage().window().maximize();

        return driver;
    }

    static async createRemoteBrowserDriver(browser)
    {
        this.capabilities = { ...capabilities };
        this.capabilities['browserName'] = browser;
        const driver = new webdriver.Builder()
            .usingServer(this.capabilities.serverURL)
            .withCapabilities({ ...this.capabilities })
            .build();
        await driver.manage().window().maximize();

        return driver;
    }



}

module.exports = DriverSingleton;