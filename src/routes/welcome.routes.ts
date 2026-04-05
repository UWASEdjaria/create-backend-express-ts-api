import { Router } from "express";
import { welcomeController } from '../controllers/welcome.controller'

const rootRouter=Router();
rootRouter.get("/", welcomeController);

export default rootRouter;