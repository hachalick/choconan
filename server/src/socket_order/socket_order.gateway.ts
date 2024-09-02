import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { SocketOrderService } from './socket_order.service';
import {} from './socket_order.dto';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: '*' })
export class SocketOrderGateway {
  @WebSocketServer() private server: Server;

  constructor(private readonly socketOrderService: SocketOrderService) {}

  updateOrders() {
    this.server.emit(`order-present`, { code: 1, message: 'reload site' });
  }

  // @SubscribeMessage('seenLicensePlate')
  // create(@MessageBody() seenLicensePlate) {
  //   const {} = seenLicensePlate;
  //   this.server.emit(`camera`, { sam: 'salam گت' });
  // }
}
