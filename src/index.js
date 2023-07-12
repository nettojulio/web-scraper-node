const { server } = require("./server/server");

async function startServer() {
  const port = 3000;
  await server.listen(port);
  console.log(`Server listening on port ${port}`);
}

startServer().catch((error) => {
  console.error("Failed to start server:", error);
});
