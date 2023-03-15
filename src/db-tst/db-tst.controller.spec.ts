import { Test, TestingModule } from '@nestjs/testing';
import { DbTstController } from './db-tst.controller';
import { DbTstService } from './db-tst.service';

describe('DbTstController', () => {
  let controller: DbTstController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DbTstController],
      providers: [DbTstService],
    }).compile();

    controller = module.get<DbTstController>(DbTstController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
