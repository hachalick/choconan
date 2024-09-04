import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { SocketOrderModule } from 'src/socket_order/socket_order.module';
import { SocketOrderGateway } from 'src/socket_order/socket_order.gateway';
import { MenuModule } from 'src/menu/menu.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductMenuEntity } from 'src/modules/entity/mysql/Product.entity';
import { PresentOrderTableEntity } from 'src/modules/entity/mysql/Present-Order-Table.entity';
import { FactorPresentOrderEntity } from 'src/modules/entity/mysql/Factor-Present-Order.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PresentOrderTableEntity,
      ProductMenuEntity,
      FactorPresentOrderEntity,
    ]),
    SocketOrderModule,
  ],
  controllers: [OrderController],
  providers: [OrderService, SocketOrderGateway],
})
export class OrderModule {}
