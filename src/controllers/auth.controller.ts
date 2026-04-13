import { Request, Response } from "express";
import * as AuthService from "../services/auth.service";

//---SIGNUP---
export const signUp = async (req: Request, res: Response) => {
    try {
        const { email, password, fullName } = req.body;
        const result = await AuthService.signUp(email, password, fullName);
        // Status 201 for Created, 400 for errors (like user already exists)
       res.status(result.success ? 201 : 400).json(result);
      }catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
      }
      };

//---LOGIN---
export const login = async(req:Request,res:Response) =>{
    try {

        const {email, password} = req.body;
        const result = await AuthService.login(email, password);
        // Status 200 for OK, 401 for Unauthorized
        res.status(result.success ? 200 : 401).json(result);
    }    catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
   
         

//---VERIFY OTP---

export const verifyOTP = async (req: Request, res: Response) => {

    try {
        const {email, otp} = req.body;
        const result = await AuthService.verifyOTP(email, otp);
      
       res.status(result.success ? 200 : 400).json(result);
       }catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
       }
       };
       
//---SEND OTP---

export const sendOTP = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const response = await AuthService.sendOTP(email);
        res.status(response.success ? 200 : 400).json(response);
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// ---LOGOUT---

export const logout = async(req: Request, res: Response)=>{
    try{
    return res.status(200).json({ 
      success: true, 
      message: "Logged out successfully" 
    });
  } catch (error) {
    return res.status(500).json({ 
      success: false, 
      message: "Error during logout" 
    });
}};
