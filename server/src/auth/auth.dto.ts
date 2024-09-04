import { ApiProperty } from '@nestjs/swagger';

export class SignupDto {
  @ApiProperty({ default: 'password | telegram-otp | sms-otp | email-otp' })
  type: string;

  @ApiProperty({ default: '98' })
  national_code: string;

  @ApiProperty({ default: '9XXXXXXXXX' })
  phone: string;

  @ApiProperty({ default: 'asd' })
  password: string;
}

export class LoginPasswordDto {
  @ApiProperty({ default: '98' })
  national_code: string;

  @ApiProperty({ default: '9XXXXXXXXX' })
  phone: string;

  @ApiProperty({ default: 'asd' })
  password: string;
}