const connection = require("../connections/connection");

async function getAllItemsRepository() {
  try {
    const { rows: dbItems } = await connection.query("SELECT * FROM items");
    const data = [...dbItems];
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function saveItemsRepository(data) {
  const { keyword, items } = data;
  for (let item of items) {
    try {
      const query = "INSERT INTO items (id, keyword, title, description, price) VALUES ($1, $2, $3, $4, $5)";
      await connection.query(query, [
        item.id,
        keyword,
        item.title,
        item.description,
        item.price,
      ]);
    } catch (error) {
      console.error("Error database: ", error);
    }
  }
}

async function updateItemsRepository(data) {
  const { keyword, items } = data;
  for (let item of items) {
    try {
      const query =
        "UPDATE items SET id=$1, keyword=$2, title=$3, description=$4, price=$5 WHERE id=$6 AND keyword=$7";
      await connection.query(query, [
        item.id,
        keyword,
        item.title,
        item.description,
        item.price,
        item.id,
        keyword,
      ]);
    } catch (error) {
      console.error("Error database: ", error);
    }
  }
}

async function deleteItemsRepository() {
  try {
    await connection.query("DELETE FROM items");
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  getAllItemsRepository,
  saveItemsRepository,
  updateItemsRepository,
  deleteItemsRepository,
};
