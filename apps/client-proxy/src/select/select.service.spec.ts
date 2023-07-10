import { Test, TestingModule } from '@nestjs/testing';
import { SelectService } from './select.service';
import { HttpModule } from '@nestjs/axios';

describe('SelectService', () => {
  let service: SelectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [SelectService],
    }).compile();
    service = module.get<SelectService>(SelectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
