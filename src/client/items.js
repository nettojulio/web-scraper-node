const { webScraper } = require("../core/scraper");

async function itemsClient() {
  return webScraper();
}

module.exports = { itemsClient };
