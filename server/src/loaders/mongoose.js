import mongoose from "mongoose";
import config from "config";

const configFile = config.get("databaseURL");

export default async () => {
  const connection = await mongoose.connect(configFile, {
    useNewUrlParser: true,
    useCreateIndex: true
  });
  return connection.connection.db;
};
