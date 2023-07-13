const { readJsonFile, saveDataToJson, deleteFile, resultJsonFilePath, createItem } = require("../utils/utils");
const { getAllItemsRepository, saveItemsRepository, deleteItemsRepository } = require("../repository/database");
const { itemsClient } = require("../client/items");

async function getItemsService() {
  let data = await await readJsonFile(resultJsonFilePath);

  if (!data) {
    const db = await getAllItemsRepository();
    data = db && createItem(db);
  }

  if (!data || data.items.length === 0) {
    data = createItem(await itemsClient());
  }

  return data;
}

async function updateItemsService() {
  const data = createItem(await itemsClient());
  await saveDataToJson(data, resultJsonFilePath);
  await deleteItemsRepository();
  await saveItemsRepository(data);
}

async function deleteItemsService() {
  await deleteFile(resultJsonFilePath);
  await deleteItemsRepository();
}

module.exports = { getItemsService, updateItemsService, deleteItemsService };
