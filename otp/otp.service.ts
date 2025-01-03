import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class OtpService {
  private otpStorage = new Map<string, string>(); // Store OTPs temporarily

  async sendOtp(email: string) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP
    this.otpStorage.set(email, otp); // Save OTP

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP is: ${otp}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      return { success: true, message: 'OTP sent successfully!' };
    } catch (error) {
      return { success: false, message: 'Failed to send OTP', error };
    }
  }

  verifyOtp(email: string, otp: string) {
    const storedOtp = this.otpStorage.get(email);
    if (storedOtp === otp) {
      this.otpStorage.delete(email); // OTP is used, remove it
      return { success: true, message: 'OTP verified successfully!' };
    } else {
      return { success: false, message: 'Invalid OTP' };
    }
  }
}
