const fs = require("fs");

const url = "https://webscraper.io/test-sites/e-commerce/allinone/computers/laptops";
const searchFor = "Lenovo";
const selectors = [".col-sm-4", ".col-lg-4", ".col-md-4"];
const resultJsonFilePath = "result.json";

async function readJsonFile(filename) {
  try {
    const jsonData = await fs.promises.readFile(filename, "utf8");
    const data = JSON.parse(jsonData);
    return data;
  } catch (error) {
    console.error(`Error to read JSON file ${filename}: ${error}`);
  }
}

async function saveDataToJson(data, filename) {
  try {
    const jsonData = JSON.stringify(data, null, 2);
    await fs.promises.writeFile(filename, jsonData);
    console.log(`Saving ${filename}.`);
  } catch (error) {
    console.error(`Error to save JSON file ${filename}: ${error}`);
  }
}

async function deleteFile(filename) {
  try {
    await fs.promises.unlink(filename);
    console.log(`Deleting ${filename}.`);
  } catch (error) {
    console.error(`Error to delete JSON file ${filename}: ${error}`);
  }
}

function includeSearchedValue(title, searchFor) {
  return title.toLowerCase().includes(searchFor.toLowerCase());
}

function sortListByPrice(list) {
  list.sort((a, b) => a.price - b.price);
}

function createItem(data) {
  return {
    keyword: searchFor,
    totalMatches: data.length,
    items: data,
  };
}

module.exports = {
  url,
  searchFor,
  selectors,
  resultJsonFilePath,
  includeSearchedValue,
  sortListByPrice,
  readJsonFile,
  saveDataToJson,
  deleteFile,
  createItem,
};
