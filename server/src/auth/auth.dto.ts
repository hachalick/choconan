import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, MaxLength, MinLength } from 'class-validator';

export class SignupDto {
  @ApiProperty({ default: '98', type: 'string', minLength: 1, maxLength: 3 })
  @IsString()
  @MaxLength(3)
  @MinLength(1)
  national_code: string;

  @ApiProperty({ default: '9XXXXXXXXX', minLength: 10, maxLength: 10 })
  @IsString()
  @Length(10)
  phone: string;

  @ApiProperty({ default: 'asdf', minLength: 4 })
  @IsString()
  @MinLength(4)
  password: string;
}

export class LoginPasswordDto {
  @ApiProperty({ default: '98', type: 'string', minLength: 1, maxLength: 3 })
  @IsString()
  @MaxLength(3)
  @MinLength(1)
  national_code: string;

  @ApiProperty({ default: '9XXXXXXXXX', minLength: 10, maxLength: 10 })
  @IsString()
  @Length(10)
  phone: string;

  @ApiProperty({ default: 'asdf', minLength: 4 })
  @IsString()
  @MinLength(4)
  password: string;
}

export class resetPasswordDto {
  @ApiProperty({ default: '98', type: 'string', minLength: 1, maxLength: 3 })
  @IsString()
  @MaxLength(3)
  @MinLength(1)
  national_code: string;

  @ApiProperty({ default: '9XXXXXXXXX', minLength: 10, maxLength: 10 })
  @IsString()
  @Length(10)
  phone: string;

  @ApiProperty({ default: 'asdf', minLength: 4 })
  @IsString()
  @MinLength(4)
  old_password: string;

  @ApiProperty({ default: 'asdf', minLength: 4 })
  @IsString()
  @MinLength(4)
  new_password: string;
}
