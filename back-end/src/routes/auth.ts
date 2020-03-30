import { Router } from "express";
import AuthnController from "../controllers/AuthController";
import { checkJwt } from "../middlewares/checkJwt";

const router = Router();

router.post("/login", AuthnController.login);

export default router;