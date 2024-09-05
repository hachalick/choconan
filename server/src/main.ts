import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { configSwagger } from './modules/config/swaagger';
import { SwaggerModule } from '@nestjs/swagger';
import { callBackListener } from './modules/utils/callBack.main';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['error', 'warn', 'debug'],
  });
  app.enableCors({ origin: '*' });
  app.useStaticAssets(join(process.cwd(), 'public'));
  const configService = app.get(ConfigService);
  const port = configService.get('App.PORT_SERVER');
  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api/swagger', app, document);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port, () => callBackListener(port));
}
bootstrap();
