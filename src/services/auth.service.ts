import * as bcryptjs from 'bcryptjs';
import db from '../lib/db';
import jwt from "jsonwebtoken";
import { generateOTP } from '../lib/utils/otp.util';
import MailService from '../services/mail.service';
import { AuthServiceResponse, AuthInterface } from '../interfaces/auth.interface';
import { Role } from "@prisma/client";

const JWT_SECRET = process.env.JWT_SECRET || "Uwase_Djaria_Secret_2026";

class AuthService {
  static async signUp(email: string, password: string, fullName: string): Promise<AuthServiceResponse> {
    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) {
      return { success: false, message: "This email is already registered." };
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const otp = generateOTP(); 
    const expires = new Date(Date.now() + 5 * 60 * 1000);

    const result = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        fullName,
        otp,
        otpExpires: expires,
        isVerified: false,
        role: Role.USER,
        
      }
    });

    await MailService.sendVerificationEmail(email, fullName, otp);

    return {
      success: true,
      message: "User created successfully! Please check your email for the OTP.",
      data: {
        id: result.id,
        email: result.email,
        fullName: result.fullName,
      }
    };
  }

  static async login(email: string, password: string): Promise<AuthServiceResponse> {
    const user = await db.user.findUnique({ where: { email } });
    
    if (!user) {
      return { success: false, message: "User not found" };
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return { success: false, message: "Invalid password" };
    }

    const newOtp = generateOTP();
    const expires = new Date(Date.now() + 5 * 60 * 1000);

    await db.user.update({
      where: { email },
      data: {
        otp: newOtp,
        otpExpires: expires,
        isVerified: false 
      }
    });

    await MailService.sendVerificationEmail(email, user.fullName, newOtp);

    return {
      success: true,
      message: "Verification code sent to email",
      requiresVerification: true,
      data: { 
        id: user.id, 
        email: user.email, 
        fullName: user.fullName 
      }
    };
  }

  static async verifyOTP(email: string, otp: string): Promise<AuthServiceResponse> {
    const user = await db.user.findUnique({ where: { email } });

    if (!user) return { success: false, message: "User not found" };
    
    if (user.otp !== otp) {
      return { success: false, message: "Invalid OTP" };
    }
    
    if (user.otpExpires && user.otpExpires < new Date()) {
      return { success: false, message: "OTP expired" };
    }

    const updatedUser = await db.user.update({
      where: { email },
      data: { 
        isVerified: true, 
        otp: null, 
        otpExpires: null 
      },
      select: { 
        id: true, 
        email: true, 
        fullName: true, 
        role: true 
      }
    });

    const token = jwt.sign(
      { id: updatedUser.id, email: updatedUser.email, role: updatedUser.role },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    return {
      success: true,
      message: "Account verified successfully",
      token,
      data: updatedUser as Partial<AuthInterface>
    };
  }

  static async sendOTP(email: string): Promise<AuthServiceResponse> {
    const user = await db.user.findUnique({ where: { email } });
    
    if (!user) return { success: false, message: "User not found" };
    if (user.isVerified) return { success: false, message: "Account already verified" };

    const newOtp = generateOTP();
    const newExpires = new Date(Date.now() + 5 * 60 * 1000);

    await db.user.update({
      where: { email },
      data: { 
        otp: newOtp, 
        otpExpires: newExpires 
      }
    });

    await MailService.sendVerificationEmail(email, user.fullName, newOtp);
    
    return { 
      success: true, 
      message: "New OTP sent successfully" 
    };
  }
}

export default AuthService;