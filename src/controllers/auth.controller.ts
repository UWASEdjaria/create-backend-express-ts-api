import { Request, Response } from "express";
import * as AuthService from "../services/auth.service";
import { AuthInterface } from "../interfaces/auth.interface";
import jwt from "jsonwebtoken";

//SIGNUP
export const signUp = async (req: Request, res: Response) => {
    try {
        const { email, password, fullName } = req.body;
        const result = await AuthService.signUp(email, password, fullName);
        
        res.status(201).json({ 
            message: "User created successfully!", 
            data: result 
        });
    } catch (error:any) {
        console.error("DATABASE ERROR:", error);
        res.status(400).json({ error: "SignUp failed." }); 
    }
};

//LOGIN: Check credentials and give a Token
export const login = async(req:Request,res:Response) =>{
    try {

        const {email, password} = req.body;
        const result = await AuthService.login(email, password);
        
        const token = jwt.sign({ id: result.id }, "MY_SECRET_KEY", { expiresIn: '1d' });
        
            res.status(200).json({
                message: "Login successful",
                token:token,
                data: result
            });
        
        } catch (error: any) {
         return res.status(401).json({ error: "Invalid email or password" });
  }
};

//VERIFY OTP

export const verifyOTP = async (req: Request, res: Response) => {

    try {
        const {email, otp} = req.body;
        const result = await AuthService.verifyOTP(email, otp);
        
        const token = jwt.sign({ id: result.id }, "MY_SECRET_KEY", { expiresIn: '1d' });
        res.status(200).json({
            message: "Account verified successfully",
            token:token,
            data: { ...result, isVerified: true }
        });
       
    } catch (error:any) {
         if (error === "INVALID_OTP") {
            return res.status(400).json({ error: "The code you entered is incorrect." });
        }
        if (error === "OTP_EXPIRED") {
            return res.status(410).json({ error: "Code expired. Please request a new one." });
        }
    
        res.status(500).json({ error: "Verification failed." });
    }
}
//RESEND OTP

export const sendOTP = async (req: Request, res: Response) => {
     
    try{
         //we need the email for a resend, so we can check if the user exists and is not already verified
    const { email } = req.body;

    if (!email) {
            return res.status(400).json({ error: "Email is required to resend the code." });
        }
    await AuthService.sendOTP(email);
        res.status(200).json({ 
            message: "A  verification code has been sent to your email." 
        });
     } catch (error:any) {
          if (error.message === "User not found") {
            return res.status(404).json({ error: "No account found with this email." });
        }
        if (error.message === "ALREADY_VERIFIED") {
            return res.status(400).json({ error: "This account is already verified." });
        }
        res.status(500).json({ error: "Server error. Please try again later." });

        }
}

