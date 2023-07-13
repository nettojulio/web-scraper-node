const { searchFor, includeSearchedValue } = require("../utils/utils");

async function findItems(links, browser) {
  const pagePromises = links.map(async (link) => {
    const page = await browser.newPage();
    return requestItem(link, page);
  });
  const list = await Promise.all(pagePromises);
  return list.filter((item) => item !== null);
}

async function waitForAllSelectors(page, selectors) {
  await Promise.all(
    selectors.map(async (selector) => await page.waitForSelector(selector))
  );
}

async function createSearchLinks(selector, page) {
  return page.$$eval(selector, (el) => el.map((link) => link.href));
}

async function getHTMLValue(selector, page) {
  const value = await page.$eval(selector, (element) => element.innerText);
  return String(value);
}

async function requestItem(link, page) {
  try {
    await page.goto(link);
    await page.waitForSelector(".col-lg-10");

    const title = await getHTMLValue(
      ".caption > h4:not(.pull-right.price)",
      page
    );

    if (!includeSearchedValue(title, searchFor)) {
      return null;
    }

    const splitURL = link.split("/");

    const id = splitURL[splitURL.length - 1];
    const description = await getHTMLValue(".description", page);
    const price = await getHTMLValue(".caption > .pull-right.price", page);

    return {
      id,
      title,
      description,
      price: parseFloat(price.replace(/[^0-9.-]+/g, "")),
    };
  } catch (error) {
    console.error(`Error processing page: ${link}`);
    console.error(error);
    return null;
  } finally {
    await page.close();
  }
}

module.exports = {
  findItems,
  waitForAllSelectors,
  createSearchLinks,
  getHTMLValue,
};
