import expressLoader from "./express";
import dependencyInjectorLoader from "./dependencyInjector";
import mongooseLoader from "./mongoose";
import socketioLoader from "./socketio";

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  console.log("DB Connected");

  const keyvalueModel = {
    name: "keyvalueModel",
    model: require("../models/keyvalue").default
  };

  const { agenda } = await dependencyInjectorLoader({
    mongoConnection,
    models: [keyvalueModel]
  });
  console.log("Dependency Injector loaded");

  await expressLoader({ app: expressApp });
  console.log("Express loaded");

  await socketioLoader({ app: expressApp });
  console.log("Socket IO Connected");

  agenda.start();
};
