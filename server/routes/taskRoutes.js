import { Router } from "express";
import { getTasks, createTask, updateTask, deleteTask, clearCompleted } from "../controllers/taskController.js";
import auth from "../middleware/auth.js";

const router = Router();

router.use(auth); // every task route needs a logged in user

router.get("/", getTasks);
router.post("/", createTask);
router.delete("/completed", clearCompleted); // must be above "/:id"
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
