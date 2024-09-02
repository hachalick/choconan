import { Module } from '@nestjs/common';
import { SocketOrderGateway } from './socket_order.gateway';
import { SocketOrderService } from './socket_order.service';

@Module({
  providers: [SocketOrderGateway, SocketOrderService],
  exports: [SocketOrderService]
})
export class SocketOrderModule {}
