import { Test, TestingModule } from '@nestjs/testing';
import { SocketOrderGateway } from './socket_order.gateway';

describe('SocketOrderGateway', () => {
  let gateway: SocketOrderGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocketOrderGateway],
    }).compile();

    gateway = module.get<SocketOrderGateway>(SocketOrderGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
