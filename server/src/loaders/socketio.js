import http from "http";
import socketio from "socket.io";
import axios from "axios";

import config from "config";
const configPort = config.get("wsPort");
const configAPIPort = config.get("port");

export default async ({ app }) => {
  const server = http.createServer(app);
  const io = socketio(server).listen(configPort).sockets;

  io.on("connection", socket => {
    socket.on("new keyvalue", keyvaluepair => {
      const postNewKeyValuePairURL = `http://localhost:${configAPIPort}/keyvalue/key`;
      const data = JSON.stringify({
        key: keyvaluepair.key,
        value: keyvaluepair.value
      });
      const headers = {
        headers: {
          "Content-Type": "application/json"
        }
      };

      axios
        .post(postNewKeyValuePairURL, data, headers)
        .then(res => {
          io.emit("new keyvalue result", {
            status: res.status,
            details: res.data.details
          });
        })
        .catch(err => {
          io.emit("new keyvalue result", {
            status: err.response.status,
            details: err.response.data.details
          });
        });
    });

    socket.on("get keyvalue", key => {
      const getKeyValuePairURL = `http://localhost:${configAPIPort}/keyvalue/key/${key.key}`;
      const headers = {
        headers: {
          "Content-Type": "application/json"
        }
      };

      axios
        .get(getKeyValuePairURL, headers)
        .then(res => {
          io.emit("get keyvalue result", {
            status: res.status,
            value: res.data.value
          });
        })
        .catch(err => {
          io.emit("get keyvalue result", {
            status: err.response.status,
            details: err.response.data.details
          });
        });
    });
  });
};
