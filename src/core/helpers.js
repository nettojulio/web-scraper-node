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

module.exports = { waitForAllSelectors, createSearchLinks, getHTMLValue };
