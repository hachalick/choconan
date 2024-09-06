import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CheckExistAccountGuard, CheckNotExpiresTokenGuard } from 'src/auth/auth.guard';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('account')
  @UseGuards(CheckExistAccountGuard)
  @UseGuards(CheckNotExpiresTokenGuard)
  getAccount(@Query('token') token: string) {
    return this.userService.getAccount({ token });
  }
}
