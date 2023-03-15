import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Generated,
} from 'typeorm';

enum FuckerType {
  fast,
  soso,
  great,
  longtime,
}

// 实体(存储库模式)
// 使用 Entity 将 class 修饰为实体类, DbTst为一个表
@Entity()
export class UserTst {
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

  // 这个数组存储时会自动join, 获取时会自动split
  @Column('simple-array')
  public names: string[];

  // simple-json 会自动调用 JSON.stringify存入
  @Column('simple-json')
  public json: Record<string, any>;
}
