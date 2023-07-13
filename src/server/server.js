const express = require("express");
const routes = require("../routes/routes");

const server = express();
server.use(routes);

module.exports = { server };
