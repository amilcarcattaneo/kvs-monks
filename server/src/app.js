import express from "express";
import config from "config";

const configPort = config.get("port");

const app = express();

async function startServer() {
  await require("./loaders").default({ expressApp: app });

  app.listen(configPort, err => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`Server listening on port: ${configPort}`);
  });
}

startServer();

module.exports = app;
