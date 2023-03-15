import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Tags {
  // 自增id
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  // 多对一关联查询, 多个用户可能对应同样的一个tag
  // ? 传入回调函数表示 Tags 表要和那个表做关联, 第二个参数依然是一个反射, 表示这个tag对应的是user表中的tags字段
  @ManyToOne(() => User, (user) => user.tags)
  public user: User;
}
