const { getItemsService, updateItemsService, deleteItemsService } = require("../services/services");
const { resultJsonFilePath, saveDataToJson, readJsonFile } = require("../utils/utils");
const { getAllItemsRepository, saveItemsRepository } = require("../repository/database");

async function getItems(request, response) {
  const data = await getItemsService();
  if (!(await readJsonFile(resultJsonFilePath))) {
    await saveDataToJson(data, resultJsonFilePath);
  }

  const db = await getAllItemsRepository();

  if (db && db.length === 0) {
    saveItemsRepository(data);
  }

  return response.status(200).send(data);
}

async function updateItems(request, response) {
  await updateItemsService();
  return response.status(200).send();
}

async function deleteItems(request, response) {
  await deleteItemsService();
  return response.status(200).send();
}

module.exports = {
  getItems,
  updateItems,
  deleteItems,
};
