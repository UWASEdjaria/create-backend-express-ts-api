import { Router } from "express";
import authRoutes from "./auth.routes";
import taskRoutes from "./task.routes";

const rootRouter = Router();
rootRouter.use('/auth', authRoutes);
rootRouter.use('/task',taskRoutes)

export default rootRouter;