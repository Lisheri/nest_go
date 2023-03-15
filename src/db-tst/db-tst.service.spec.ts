import { Test, TestingModule } from '@nestjs/testing';
import { DbTstService } from './db-tst.service';

describe('DbTstService', () => {
  let service: DbTstService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DbTstService],
    }).compile();

    service = module.get<DbTstService>(DbTstService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
