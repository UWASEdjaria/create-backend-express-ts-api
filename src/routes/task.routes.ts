import { Router } from "express";
import * as controller from "../controllers/task.controller";
import { validate } from "../middlewares/validate.middleware";
import { createTaskSchema } from "../validations/task.validation";
import { authMiddleware } from "../middlewares/auth.middleware"; // Now this will work!

const router = Router();

// Apply authMiddleware to both routes
router.get("/", authMiddleware, controller.handleGetTasks);
router.post("/", authMiddleware, validate(createTaskSchema), controller.handleCreateTasks);

export default router;