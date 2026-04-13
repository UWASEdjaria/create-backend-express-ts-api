//handle the Gmail connection.

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendVerificationEmail = async (email: string, fullName: string, otp: string) => {
  await transporter.sendMail({
    from: `"TaskTrack" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify your Account",
    text: `Hello ${fullName}, your verification code is ${otp}. It expires in 5 minutes.`
  });
};