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
import { LoginPasswordDto, SignupDto } from './auth.dto';
import { CheckIsExpiresOtpGuard, CheckNotExpiresOtpGuard } from './auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('set-default')
  setDefaultDg() {
    return this.authService.setDefaultDb();
  }

  @Post('signup')
  signup(@Body() body: SignupDto) {}

  @Put('login-password')
  loginPassword(@Body() body: LoginPasswordDto) {
    const { national_code, password, phone } = body;
    return this.authService.loginPassword({ national_code, password, phone });
  }

  @Get('refresh-token/:token')
  refreshToken(@Param('token') token: string) {
    return this.authService.refreshToken({ token });
  }
}
