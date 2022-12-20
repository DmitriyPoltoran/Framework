const fs = require("fs/promises");

let indexOfScreenshot = 0;
const makeScreenshot = async (driver, message) =>
{
    const screenshotName = message.toLowerCase().split(" ").join("-");
    const date = new Date();

    const day = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    const time = `${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;

    await driver.takeScreenshot().then((image) =>
    {
        fs.writeFile(`./screenshots/error-in-test_${screenshotName}_${day}_${time}.png`, image, "base64");
    });
    indexOfScreenshot++;
};

const parsePrice = (totalPriceString) => totalPriceString.trim().includes(' ') ? Number(totalPriceString.split("$")[1].split(' ').join('')) : Number(totalPriceString.split("$")[1])



module.exports = {
    makeScreenshot,
    parsePrice,
};