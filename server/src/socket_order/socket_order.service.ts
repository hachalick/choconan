import { Injectable } from '@nestjs/common';
import { WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@Injectable()
export class SocketOrderService {
  @WebSocketServer() private server: Server;

  test() {
    this.server.emit(`camera`, { sam: 'salam' });
  }
}
