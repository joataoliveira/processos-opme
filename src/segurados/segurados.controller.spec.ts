import { Test, TestingModule } from '@nestjs/testing';
import { SeguradosController } from './segurados.controller';
import { SeguradosService } from './segurados.service';

describe('SeguradosController', () => {
  let controller: SeguradosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeguradosController],
      providers: [SeguradosService],
    }).compile();

    controller = module.get<SeguradosController>(SeguradosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
