import { Router } from "express";
import auth from "./auth";
import user from "./user";
import story from "./story";

const routes = Router();

routes.use("/auth", auth);
routes.use("/user", user);
routes.use("/story", story);

export default routes;