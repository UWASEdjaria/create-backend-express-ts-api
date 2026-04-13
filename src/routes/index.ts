import { Router } from "express";
import authRoutes from "./auth.routes";

const rootRouter = Router();
rootRouter.use('/auth', authRoutes);
import welcomeRoutes from "../routes/welcome.routes";

const rootRouter = Router();
welcomeRoutes.use('/welcome',welcomeRoutes);

export default rootRouter;