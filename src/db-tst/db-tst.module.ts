import { Module } from '@nestjs/common';
import { DbTstService } from './db-tst.service';
import { DbTstController } from './db-tst.controller';
// import { DbTst } from './entities/db-tst.entity';
// import { UserTst } from './entities/use-tst.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Tags } from './entities/tags.entity';

@Module({
  imports: [
    // 关联实体
    TypeOrmModule.forFeature([User, Tags]),
  ],
  controllers: [DbTstController],
  providers: [DbTstService],
})
export class DbTstModule {}
