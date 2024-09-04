import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('get-video')
  getAllVideo() {
    return this.appService.getAllVideo();
  }

  @Get('get-video/:category')
  getCategoryVideo(@Param('category') category: string) {
    return this.appService.getCategoryVideo({ category });
  }

  @Get('get-last-video/:category')
  getCategoryLastVideo(@Param('category') category: string) {
    return this.appService.getCategoryLastVideo({ category });
  }
}
