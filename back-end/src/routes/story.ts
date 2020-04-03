import { Router } from 'express';
import StoryController from '../controllers/StoryController';
import { checkJwt } from '../middlewares/checkJwt';
import { checkRole } from '../middlewares/checkRole';
import { UserRole } from "../entity/User"

const router = Router();


// Add cookieParser 
// checkJwt middleware relies on cookies being available
// app.use(cookieParser());

router.all("*", checkJwt)

// get all stories with status
router.get("/", checkRole(UserRole.ADMIN), StoryController.listAll)

// get stroies of a specific user
router.get("/get", StoryController.getByUserId);

// get create stories
router.post("/createStory", StoryController.newStory);

// update story status
router.patch("/:id([0-9]+)", checkRole(UserRole.ADMIN), StoryController.updateStoryStatus);

export default router;