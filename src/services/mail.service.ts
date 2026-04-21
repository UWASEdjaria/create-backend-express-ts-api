//handle the Gmail connection.

import nodemailer from 'nodemailer';

class MailService{

 private static transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

static async sendVerificationEmail(email: string, fullName: string, otp: string):Promise<void>{
  try {
    await this.transporter.sendMail({
    from: `"TaskTrack" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify your Account",
    text: `Hello ${fullName}, your verification code is ${otp}. It expires in 5 minutes.`
  });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Mail error";
      console.error("[MailService.sendVerificationEmail] Error:", msg);
    
  }
  
};
};
export default MailService;