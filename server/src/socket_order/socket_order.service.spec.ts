import { Test, TestingModule } from '@nestjs/testing';
import { SocketOrderService } from './socket_order.service';

describe('SocketOrderService', () => {
  let service: SocketOrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocketOrderService],
    }).compile();

    service = module.get<SocketOrderService>(SocketOrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
