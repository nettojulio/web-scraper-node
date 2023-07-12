const express = require("express");
const { scraper } = require("../core/scraper");
const { readJsonFile, saveDataToJson, deleteFile, searchFor } = require("../utils/utils");

const server = express();

const resultJsonFilePath = "result.json";
const delayDuration = 60 * 1000;

async function performRequest() {
  let data;

  try {
    data = await readJsonFile(resultJsonFilePath);
  } catch (error) {
    console.error(error);
  }

  if (!data) {
    console.log("Sending request");
    const request = await scraper();
    data = {
      keyword: searchFor,
      totalMatches: request.length,
      items: request,
    };
    await saveDataToJson(data, resultJsonFilePath);
    scheduleFileDeletion();
  } else {
    console.log("Using local cache");
  }

  return data;
}

async function scheduleFileDeletion() {
  await new Promise((resolve) => setTimeout(resolve, delayDuration));
  await deleteFile(resultJsonFilePath);
}

server.get("/", async (request, response) => {
  const data = await performRequest();
  response.send(data);
});

module.exports = { server };
