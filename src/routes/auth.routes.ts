import { Router } from "express";
import  AuthController from "../controllers/auth.controller"
import { validate } from "../middlewares/validate.middleware";
import { signupSchema, loginSchema, emailSchema, verifyOTPSchema } from "../validations/auth.validation";


const authRouter = Router();
authRouter.post("/signup", validate(signupSchema), AuthController.signUp);
authRouter.post("/login", validate(loginSchema),AuthController.login);
authRouter.post("/send-otp", validate(emailSchema),AuthController.sendOTP);
authRouter.post("/verify-otp", validate(verifyOTPSchema),AuthController.verifyOTP);
authRouter.post("/logout", AuthController.logout);

export default authRouter;
