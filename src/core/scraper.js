const puppeteer = require("puppeteer");
const { sortListByPrice, url, selectors } = require("../utils/utils");
const { waitForAllSelectors, createSearchLinks } = require("./helpers");
const { findItems } = require("./handlers");

async function scraper() {
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
    console.error("Panic:",error)
    return [];
  }

}

module.exports = { scraper };
