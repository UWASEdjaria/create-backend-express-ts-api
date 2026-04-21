import { Router } from "express";
import  TaskController from "../controllers/task.controller";
import { validate } from "../middlewares/validate.middleware";
import { createTaskSchema } from "../validations/task.validation";
import { authMiddleware } from "../middlewares/auth.middleware"; // Now this will work!

const router = Router();

// Apply authMiddleware to both routes
router.get("/", authMiddleware, TaskController.handleGetTasks);

router.get("/:id", authMiddleware, TaskController.handleGetTaskById);

router.post("/", authMiddleware, validate(createTaskSchema), TaskController.handleCreateTasks);

export default router;