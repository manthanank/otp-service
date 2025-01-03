import { Controller, Get, Query } from '@nestjs/common';
import { OtpService } from './otp.service';

@Controller('api')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @Get('sendOTP')
  async sendOtp(@Query('email') email: string) {
    return this.otpService.sendOtp(email);
  }

  @Get('verifyOTP')
  async verifyOtp(@Query('email') email: string, @Query('otp') otp: string) {
    return this.otpService.verifyOtp(email, otp);
  }
}
