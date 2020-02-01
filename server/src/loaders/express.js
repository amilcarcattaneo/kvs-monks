import express from "express";
import cors from "cors";
import routes from "../api";

export default async ({ app }) => {
  app.get("/ping", (req, res) => {
    res.status(200).send("pong");
  });

  app.use(cors());

  app.use(express.json());

  app.use("/", routes);
};
