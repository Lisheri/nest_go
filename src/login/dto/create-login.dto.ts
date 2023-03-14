import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator'; // 用于验证参数, 也是装饰器

// 管道验证DTO: data transform object, 其实就是类似rules做一个验证
// 如果需要更高级的验证功能, 我们需要两个库, 一个是 class-validator, 另一个是 class-transformer
export class CreateLoginDto {
  // 这里可以用于定义类型
  @IsNotEmpty({ message: '你不要乱传' })
  @IsString({ message: '少年你搞清楚类型了没有' })
  // 依次为min, max, 以及描述符
  @Length(5, 10, {
    message: '不要超过10个, 也不要低于5个',
  })
  public name: string;
  @IsNumber({}, { message: '少年你搞清楚类型了没有' })
  public age: number;
}
