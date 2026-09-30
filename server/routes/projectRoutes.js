import { Router } from "express";
import { getProjects, createProject, deleteProject } from "../controllers/projectController.js";
import auth from "../middleware/auth.js";

const router = Router();

router.use(auth); // every project route needs a logged in user

router.get("/", getProjects);
router.post("/", createProject);
router.delete("/:id", deleteProject);

export default router;
