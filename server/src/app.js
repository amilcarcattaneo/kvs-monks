import express from "express";
import config from "config";

const configPort = config.get("port");
const port = process.env.PORT || configPort;

const app = express();

async function startServer() {
  await require("./loaders").default({ expressApp: app });

  app.listen(port, err => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`Server listening on port: ${port}`);
  });
}

startServer();

module.exports = app;
