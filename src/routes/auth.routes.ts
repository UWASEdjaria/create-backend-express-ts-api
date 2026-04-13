import { Router } from "express";
import  {signUp , login, verifyOTP, sendOTP ,} from "../controllers/auth.controller"




const authRouter = Router();
authRouter.post("/signup", signUp)
authRouter.post("/login", login);
authRouter.post("/verify-otp", verifyOTP);
authRouter.post("/send-otp", sendOTP);


export default authRouter;
