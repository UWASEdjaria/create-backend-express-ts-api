import { Request, Response } from "express";
import  AuthService from "../services/auth.service";

class AuthController{
//---SIGNUP---
static async  signUp(req: Request, res: Response) :Promise<Response>  {
    try {
        const { email, password, fullName } = req.body;
        const result = await AuthService.signUp(email, password, fullName);
        // Status 201 for Created, 400 for errors (like user already exists)
     return res.status(result.success ? 201 : 400).json(result);

      }catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        console.error("[AuthController.signUp] Error:", errorMessage);

        return res.status(500).json({ success: false, message: "Internal server error" });
      }
      };

//---LOGIN---
static async login(req:Request,res:Response): Promise<Response>{
    try {

        const {email, password} = req.body;
        const result = await AuthService.login(email, password);
        // Status 200 for OK, 401 for Unauthorized
        return res.status(result.success ? 200 : 401).json(result);
    }    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
      console.error("[AuthController.login] Error:", errorMessage);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};
   
         

//---VERIFY OTP---

static async verifyOTP (req: Request, res: Response):Promise<Response>{

    try {
        const {email, otp} = req.body;
        const result = await AuthService.verifyOTP(email, otp);
      
       return res.status(result.success ? 200 : 400).json(result);
       }catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
      console.error("[AuthController.verifyOTP] Error:", errorMessage);
        return res.status(500).json({ success: false, message: "Internal server error" });
       }
       };
       
//---SEND OTP---

static async sendOTP(req: Request, res: Response):Promise<Response>{
    try {
        const { email } = req.body;
        const response = await AuthService.sendOTP(email);
        return res.status(response.success ? 200 : 400).json(response);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
      console.error("[AuthController.verifyOTP] Error:", errorMessage);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// ---LOGOUT---

static async logout(req: Request, res: Response):Promise<Response>{
    try{
    return res.status(200).json({ 
      success: true, 
      message: "Logged out successfully" 
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
      console.error("[AuthController.logout] Error:", errorMessage);
    return res.status(500).json({ 
      success: false, 
      message: "Error during logout" 
    });
}};
};
export default AuthController;