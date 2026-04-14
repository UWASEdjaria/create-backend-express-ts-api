import { z } from "zod";

export const signupSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    fullName: z.string().min(3, "Full name is required"),
  });

export const loginSchema = z.object({
  
    email: z.string().email("Invalid email format"),
    password: z.string().min(1, "Password is required"),
  });

export const emailSchema = z.object({

    email: z.string().email("Invalid email format"),
  })

export const verifyOTPSchema = z.object({

    email: z.string().email("Invalid email format"),
    otp: z.string()
      .length(6, "OTP must be exactly 6 digits")
      //Must be numbers only, from start to finish
      .regex(/^\d+$/, "OTP must only contain numbers"), 
  })