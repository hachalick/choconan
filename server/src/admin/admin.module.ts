import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryProductMenuEntity } from 'src/modules/entity/mysql/Category-Product.entity';
import { ProductMenuEntity } from 'src/modules/entity/mysql/Product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoryProductMenuEntity, ProductMenuEntity]),
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
