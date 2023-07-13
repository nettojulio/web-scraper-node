const puppeteer = require("puppeteer");
const { sortListByPrice, url, selectors } = require("../utils/utils");
const { findItems, waitForAllSelectors, createSearchLinks } = require("./handlers");

async function webScraper() {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url);

    await waitForAllSelectors(page, selectors);

    const links = await createSearchLinks(".caption > h4 > a", page);
    const list = await findItems(links, browser);

    sortListByPrice(list);

    await browser.close();

    return list;
  } catch (error) {
    console.error("Panic:", error);
    return [];
  }
}

module.exports = { webScraper };
