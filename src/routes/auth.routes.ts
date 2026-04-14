import { Router } from "express";
import * as controller from "../controllers/auth.controller"
import { validate } from "../middlewares/validate.middleware";
import { signupSchema, loginSchema, emailSchema, verifyOTPSchema } from "../validations/auth.validation";




const authRouter = Router();
authRouter.post("/signup", validate(signupSchema), controller.signUp);
authRouter.post("/login", validate(loginSchema),controller.login);
authRouter.post("/send-otp", validate(emailSchema),controller.sendOTP);
authRouter.post("/verify-otp", validate(verifyOTPSchema),controller.verifyOTP);
authRouter.post("/logout", controller.logout);

export default authRouter;
