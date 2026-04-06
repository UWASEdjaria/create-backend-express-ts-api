import { Router } from "express";
import welcomeRoutes from "../routes/welcome.routes";

const rootRouter = Router();
welcomeRoutes.use('/welcome',welcomeRoutes);

export default rootRouter;