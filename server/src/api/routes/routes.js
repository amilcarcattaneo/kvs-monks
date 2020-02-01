import { Router } from "express";

import keyvalue from "./keyvalue";

const route = Router();

export default app => {
  app.use("/keyvalue", route);

  route.get("/key/:key", keyvalue.Get);

  route.post("/key", keyvalue.Set);
};
