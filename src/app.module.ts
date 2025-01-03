import { Module } from '@nestjs/common';
import { OtpModule } from 'otp/otp.module';
import { AppController } from './app.controller';

@Module({
  imports: [OtpModule],
  controllers: [AppController],
})
export class AppModule {}
