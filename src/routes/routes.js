const express = require("express");
const { getItems, updateItems, deleteItems } = require("../controllers/crawler");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../docs/swagger_output.json');

const routes = express();

routes.get("/", getItems);
routes.put("/", updateItems);
routes.delete("/", deleteItems);
routes.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = routes;
