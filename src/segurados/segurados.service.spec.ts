import { Test, TestingModule } from '@nestjs/testing';
import { SeguradosService } from './segurados.service';

describe('SeguradosService', () => {
  let service: SeguradosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeguradosService],
    }).compile();

    service = module.get<SeguradosService>(SeguradosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
