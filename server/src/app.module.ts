import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmDbConfig } from './modules/config/typeorm.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomConfigsModule } from './modules/config/configs.module';
import { LoggerMiddleware } from './app.middleware';
import { OrderModule } from './order/order.module';
import { MenuModule } from './menu/menu.module';
import { BlogModule } from './blog/blog.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmDbConfig,
      inject: [CustomConfigsModule],
    }),
    CustomConfigsModule,
    AuthModule,
    BlogModule,
    OrderModule,
    MenuModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
