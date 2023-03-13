import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as svgCaptcha from 'svg-captcha'; // 用于生成验证码

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `User模块: This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  getCaptcha() {
    // 生成的captcha中, text为真实验证码, 而 data为图片数据
    return svgCaptcha.create({
      size: 4,
      width: 100,
      height: 34,
      fontSize: 50,
      background: "#cc9966"
    })
  }
}
