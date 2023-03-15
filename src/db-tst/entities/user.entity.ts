import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Generated,
  OneToMany,
} from 'typeorm';
import { Tags } from './tags.entity';

enum FuckerType {
  fast,
  soso,
  great,
  longtime,
}

// 实体(存储库模式)
// 使用 Entity 将 class 修饰为实体类, DbTst为一个表
@Entity()
export class User {
  // PrimaryGeneratedColumn 设置自增id
  @PrimaryGeneratedColumn()
  // 如果想设置为自增的uuid, 可以使用 @PrimaryGeneratedColumn('uuid')
  public id: number;

  // Column可以接收一个 type, 和数据库的类型是对应的
  @Column({ type: 'varchar', length: 255 })
  public name: string;

  // select 表示查询时过滤不会返回给用户
  @Column({
    type: 'varchar',
    select: true,
    comment: '注释',
    default: '123456',
    nullable: true,
  })
  public password: string;

  @Column()
  public age: number;

  // 自动生成一列uuid
  @Generated('uuid')
  public uuid: string;

  @CreateDateColumn({ type: 'timestamp' })
  public createTime: Date;

  @Column({ type: 'enum', enum: FuckerType, default: FuckerType.soso })
  public fuckerType: FuckerType;

  @Column({ type: 'varchar', length: 2000, default: '' })
  public desc: string;

  // 一对多关联查询
  // 入参回调函数表示和哪个表关联, 同时第二个参数是一个反向关系, 表示查询到数据后, 使用目标表的哪一个字段
  // 多表联查, 这里必须要带反射, 表明我这个tags 和 tag表的userId形成绑定
  @OneToMany(() => Tags, (tag) => tag.user)
  public tags: Tags[];
}
