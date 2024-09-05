import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginPasswordDto, resetPasswordDto, SignupDto } from './auth.dto';
import {
  LoginGuard,
  RefreshTokenGuard,
  ResetPasswordGuard,
  SignUpGuard,
} from './auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('set-default')
  setDefaultDg() {
    return this.authService.setDefaultDb();
  }

  @Post('signup')
  @UseGuards(SignUpGuard)
  signup(@Body() body: SignupDto) {
    const { national_code, password, phone } = body;
    return this.authService.signupPassword({ national_code, password, phone });
  }

  @Put('login-password')
  @UseGuards(LoginGuard)
  loginPassword(@Body() body: LoginPasswordDto) {
    const { national_code, password, phone } = body;
    return this.authService.loginPassword({ national_code, password, phone });
  }

  @Get('refresh-token/:token')
  @UseGuards(RefreshTokenGuard)
  refreshToken(@Param('token') token: string) {
    return this.authService.refreshToken({ token });
  }

  @Put('reset-password')
  @UseGuards(ResetPasswordGuard)
  resetPassword(@Body() body: resetPasswordDto) {
    const { new_password, national_code, phone } = body;
    return this.authService.resetPassword({
      new_password,
      national_code,
      phone,
    });
  }
}
