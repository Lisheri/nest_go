import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Like, Repository } from 'typeorm';
import { CreateDbUserDto } from './dto/create-db-tst.dto';
import { UpdateDbTstDto } from './dto/update-db-tst.dto';
import { Tags } from './entities/tags.entity';
import { User } from './entities/user.entity';

export interface IFindAll {
  keyWord: string;
  pageIndex: number;
  pageSize: number;
}

export interface IAddTags {
  tags: string[];
  userId: number;
}

@Injectable()
export class DbTstService {
  // 注入实体
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>, // user表 实体
    @InjectRepository(Tags) private readonly tags: Repository<Tags>, // tags表 实体
  ) {}
  create(createUserDto: CreateDbUserDto) {
    const data = new User();
    data.name = createUserDto.name;
    data.desc = createUserDto.desc;
    data.age = createUserDto.age;
    return this.user.save(data);
  }

  async findAll({ keyWord = '', pageIndex = 1, pageSize = 10 }: IFindAll) {
    const data = await this.user.find({
      // 遇到关联表一并查出
      relations: ['tags'],
      where: {
        name: Like(`%${keyWord}%`),
      },
      // 本质上就是limit, 数量是从0开始的
      skip: (pageIndex - 1) * pageSize,
      take: pageSize,
    });
    const total = await this.user.count({
      where: {
        name: Like(`%${keyWord}%`),
      },
    });
    // 返回一个promise
    return {
      list: data,
      total,
    };
  }

  findOne(id: number) {
    return this.user.find({
      where: {
        id: Equal(id),
      },
    });
  }

  update(id: number, updateDbTstDto: UpdateDbTstDto) {
    return this.user.update(id, updateDbTstDto);
  }

  remove(id: number) {
    return this.user.delete(id);
  }

  async addTags({ tags = [], userId = 0 }: IAddTags) {
    console.info(tags, userId);
    const userInfo = await this.user.findOne({ where: { id: userId } });
    if (!userInfo) {
      return {
        code: 10200,
        message: '无法找到对应用户, 请联系管理员!',
        data: null,
      };
    }
    const tagList: Tags[] = [];
    for (const name of tags) {
      const tag = new Tags();
      tag.name = name;
      // tag.user = userInfo;
      await this.tags.save(tag);
      tagList.push(tag);
    }
    userInfo.tags = tagList;
    this.user.save(userInfo);
    return true;
  }
}
