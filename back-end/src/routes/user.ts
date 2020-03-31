import { Router } from "express";
import UserController from "../controllers/UserController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";
import { UserRole } from "../entity/User"

const router = Router();

router.all("*", [checkJwt, checkRole(UserRole.ADMIN)])
// Get all users
router.get("/", UserController.listAll);

// Get one Usr
router.get("/:id([0-9]+)", UserController.getOneById);

// Create a new User
router.post("/", UserController.newUser);

export default router;