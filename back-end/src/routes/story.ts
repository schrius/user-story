import { Router } from 'express';
import StoryController from '../controllers/StoryController';
import { checkJwt } from '../middlewares/checkJwt';
import { checkRole } from '../middlewares/checkRole';

const router = Router();

router.get("/", [checkJwt, checkRole(["ADMIN"])], StoryController.listAll)

router.get("/:id([0-9]+)", [checkJwt, checkRole(["ADMIN"])], StoryController.getByUserId);

router.post("/", [checkJwt, checkRole(["ADMIN"])], StoryController.newStory);

router.patch("/:id([0-9]+)", [checkJwt, checkRole(["ADMIN"])], StoryController.updateStoryStatus);

export default router;