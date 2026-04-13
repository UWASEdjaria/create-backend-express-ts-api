import * as bcryptjs from 'bcryptjs';
import db from '../lib/db';
import { generateOTP } from '../lib/utils/otp.util';
import { sendVerificationEmail } from '../services/mail.service';

//SIGNUP
export const signUp = async (email: string, password: string, fullName: string) => {

  //check if the user already exists
  const existingUser = await db.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error("This email is already registered.");
  }

  // Security and OTP generation
  const hashedPassword = await bcryptjs.hash(password, 10);
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expires = new Date(Date.now() + 5 * 60 * 1000);

  // Save user to database
  const result = await db.user.create({
    data: {
      email,
      password: hashedPassword,
      fullName,
      otp,
      otpExpires: expires,
      isVerified: false
    }
  });

  await sendVerificationEmail(email, fullName, otp);

  // Return non-sensitive data only
  return {
    id: result.id,
    email: result.email,
    fullName: result.fullName,
    createdAt: result.createdAt
  };
};

//LOGIN

export const login = async (email: string , password: string) =>{

   //find user in database
      const result = await db.user.findUnique({
        where: { email }
    });
      if (!result) {
        throw new Error("User not found");
    } 

    const isPasswordValid = await bcryptjs.compare(password, result.password);
    if (!isPasswordValid) {
        throw new Error("Invalid password");
    }
  
    //Return user info (success)
    return {
        id: result.id,
        email:result.email,
        fullName:result.fullName,
        isVerified: result.isVerified
    };
};

//ISVERIFIED

export const verifyOTP = async (email:string, otp:string)=>{

   const result = await db.user.findUnique({ where:{email}});
   
   if(!result) throw new Error("user not found");
   
   if(result.otp !== otp){
    throw new Error("Invalid OTP");
   }
   if(result.otpExpires && result.otpExpires < new Date()){
    throw new Error("OTP expired");
   }
  return await db.user.update({
    where: { email: email },
    data: {
      isVerified: true,
      otp: null,
      otpExpires: null
    },
    //bring only this specific data
    select: {
      id: true,
      email: true,
      fullName: true
    }
  });
};
//RESEND OTP

export const sendOTP = async (email:string) => {
  const result = await db.user.findUnique({ where: { email } });
  if (!result) {
    throw new Error("User not found");
  }
  if (result.isVerified) {
        throw new Error("ALREADY_VERIFIED");
    }
   const newOtp = generateOTP();
   const newExpires = new Date(Date.now() + 5 * 60 * 1000);

  await db.user.update({
        where: { email },
        data: {
            otp: newOtp,
            otpExpires: newExpires
        }
    });
    await sendVerificationEmail(email, result.fullName, newOtp);
    return { message: "New OTP sent successfully" };
}



