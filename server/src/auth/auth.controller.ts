import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginPasswordDto, resetPasswordDto, SignupDto } from './auth.dto';
import {
  CheckNotExpiresTokenGuard,
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

  @Get('get-role/:token')
  getRole(@Param('token') token: string) {
    return this.authService.getRole({ token });
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

  @Put('update-password')
  @UseGuards(ResetPasswordGuard)
  @UseGuards(CheckNotExpiresTokenGuard)
  updatePassword(@Query('token') token: string, @Body() body: resetPasswordDto) {
    const { new_password } = body;
    return this.authService.updatePassword({
      new_password,
      token,
    });
  }
}
