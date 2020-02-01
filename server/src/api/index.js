import { Router } from "express";
import routes from "./routes/routes";

const app = Router();
routes(app);

export default app;
