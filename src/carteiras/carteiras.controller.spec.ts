import { Test, TestingModule } from '@nestjs/testing';
import { CarteirasController } from './carteiras.controller';
import { CarteirasService } from './carteiras.service';

describe('CarteirasController', () => {
  let controller: CarteirasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarteirasController],
      providers: [CarteirasService],
    }).compile();

    controller = module.get<CarteirasController>(CarteirasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
