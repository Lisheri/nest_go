import { ArgumentMetadata, HttpException, Injectable, PipeTransform, HttpStatus } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class LoginPipe implements PipeTransform {
  // LoginPipe 本质上就是一个实现了 transform 的类
  /**
   * 
   * @param value 被处理的当前值
   * @param metadata 元信息, 比如类型 class CreateLoginDto, type: 装饰器的名称, data: 装饰器的值, 比如传给@Body一个值name
   * @returns 
   */
  async transform(value: any, metadata: ArgumentMetadata) {
    const DTO = plainToInstance(metadata.metatype, value); // 实例化DTO类, 同时会把value反射到DTO中
    // validate会返回一个Promise的错误信息数组
    const err = await validate(DTO);
    // 可以通过err.length去判断是否验证通过
    if (err.length) {
      // 有误, HttpStatus是一个枚举, 用于传递返回值
      // BAD_REQUEST是400, 使用400就好了, 如果通过就成功
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
    console.info(err); // 可以看到已经反射到了类上, 这个时候就可以进行验证了, 使用validator函数
    return value;
  }
}
