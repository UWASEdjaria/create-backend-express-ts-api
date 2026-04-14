import * as bcryptjs from 'bcryptjs';
import db from '../lib/db';
import jwt from "jsonwebtoken";
import { generateOTP } from '../lib/utils/otp.util';
import { sendVerificationEmail } from '../services/mail.service';

const JWT_SECRET = process.env.JWT_SECRET as string;

// --- SIGNUP ---
export const signUp = async (email: string, password: string, fullName: string) => {
  const existingUser = await db.user.findUnique({ where: { email } });
  if (existingUser) {
   return { success: false, message: "This email is already registered."};
  }

  // Security and OTP generation
  const hashedPassword = await bcryptjs.hash(password, 10);
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expires = new Date(Date.now() + 5 * 60 * 1000);

  // Save user to database
  const result = await db.user.create({
    data: {email, password: hashedPassword, fullName, otp,otpExpires: expires,isVerified: false
    }
  });

  await sendVerificationEmail(email, fullName, otp);

  // Return non-sensitive data only
  return {
    success: true, 
    message: "User created successfully!",

    data:{id: result.id, email: result.email, fullName: result.fullName, createdAt: result.createdAt
       }
   
  };
};

//LOGIN

export const login = async (email: string , password: string) =>{

   //find user in database
      const result = await db.user.findUnique({
        where: { email }
    });
      if (!result) {
        return { success: false, message: "User not found" };
    } 

    const isPasswordValid = await bcryptjs.compare(password, result.password);
    if (!isPasswordValid) {
        return { success: false, message: "Invalid password" };
    }
    //generate fresh OTP
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 5 * 60 * 1000);
  
       await db.user.update({
        where: { email },
        data: { 
            otp: newOtp, 
            otpExpires: expires, 
            isVerified: false // This "locks" the account again
        }
    });
    //send email
    await sendVerificationEmail(email, result.fullName, newOtp);

    //Return user info (success)
    return {
        success: true, 
        message: "Verification code sent to email", 
        requiresVerification: true,
      data:{id: result.id, email:result.email, fullName:result.fullName, isVerified: result.isVerified
      }
       
    };
};

//--- VERIFY OTP ---
export const verifyOTP = async (email:string, otp:string)=>{

   const result = await db.user.findUnique({ where:{email}});
   
   if(!result)return { success: false, message: "User not found" };
   
   if(result.otp !== otp){return { success: false, message: "Invalid OTP" };
   }
   if(result.otpExpires && result.otpExpires < new Date()){return { success: false, message: "OTP expired" };
   }

const updatedUser = await db.user.update({
    where: { email: email },
    data: { isVerified: true, otp: null,otpExpires: null },
    select: {id: true, email: true, fullName: true}  // Security selection kept
  });

  const token = jwt.sign({ id: updatedUser.id, email: updatedUser.email }, JWT_SECRET, { expiresIn: '1d' });
return { success: true, message: "Account verified successfully", token, data: updatedUser };
};

//---RESEND OTP----

export const sendOTP = async (email:string) => {
  const result = await db.user.findUnique({ where: { email } });
  if (!result) {
   return { success: false, message: "User not found" };
  }
  if (result.isVerified) {
       return { success: false, message: "ALREADY_VERIFIED" };
    }
   const newOtp = generateOTP();
   const newExpires = new Date(Date.now() + 5 * 60 * 1000);

  await db.user.update({
        where: { email },
        data: { otp: newOtp, otpExpires: newExpires
        }
    });
    await sendVerificationEmail(email, result.fullName, newOtp);
    return { success: true, message: "New OTP sent successfully" };
}



