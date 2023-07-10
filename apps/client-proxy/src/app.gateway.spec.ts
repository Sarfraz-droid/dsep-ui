import { Test, TestingModule } from '@nestjs/testing';
import { AppGateway } from './app.gateway';
import { SearchService } from './search/search.service';
import { SelectService } from './select/select.service';
import { HttpModule } from '@nestjs/axios';

describe('AppGateway', () => {
  let gateway: AppGateway;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [AppGateway, SearchService, SelectService],
    }).compile();

    gateway = app.get<AppGateway>(AppGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
