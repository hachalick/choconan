import { Module } from '@nestjs/common';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryProductMenuEntity } from 'src/modules/entity/mysql/Category-Product.entity';
import { ProductMenuEntity } from 'src/modules/entity/mysql/Product.entity';
import { JwtModule } from 'src/modules/jwt/jwt.module';
import { UserEntity } from 'src/modules/entity/mysql/User.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoryProductMenuEntity, ProductMenuEntity, UserEntity]),
    JwtModule,
  ],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}
