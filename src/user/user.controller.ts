import {
  Controller,
  Get,
  Request,
  Query,
  Post,
  Body,
  Headers,
  Response,
  Param,
  Session,
  ParseIntPipe, // 管道, 用于转换参数到数字
  ParseUUIDPipe
  // ParseFloatPipe
  // ParseBoolPipe
  // ParseArrayPipe
  // ParseUUIDPipe
  // ParseEnumPipe
  // DefaultValuePipe
} from '@nestjs/common'; // 参数装饰器
import { Code } from 'src/constants';
import { UserService } from './user.service';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import * as uuid from 'uuid';

// TODO UUID 的生成有很多种, v1的方式是利用mac(物理)地址进行加密, 但是mac地址可能会重复(尽管几率不大)
// TODO v3采用混乱算法进行加密, 同样可能会重复
// TODO v4 通过随机数进行生成, 这个不那么容易重复
console.info(uuid.v4())

@Controller({
  path: 'user',
  version: '1',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  // get请求传参
  @Get()
  // 使用 Request 参数装饰器
  findAll(@Request() req) {
    // get请求使用 query 获取参数
    console.info(req.query);
    return {
      code: 0,
      message: req.query.name,
    };
  }

  @Get('get/:id')
  // @HttpCode(500) // 强制500状态码
  find(@Query() query, @Param('id') id, @Headers() header) {
    console.info(header);
    return {
      code: 0,
      message: query.name,
      data: { id },
    };
  }

  @Get('get_pipe/:id')
  // 直接将 ParseIntPipe 管道, 传递给装饰器的第二个参数, 就可以将装饰参数转换为对应的类型, 比如这里的number
  getPipe(@Param('id', ParseIntPipe) id) {
    // 可以看到这里的默认接收到的id是一个string类型, 但有时服务端需要的是一个number
    // 此时可以利用 ParseIntPipe 这个管道对收到的数据进行处理
    console.info(typeof id, id);
    return id;
  }

  @Get('get_uuid_pipe/:id')
  // 这里需要一个uuid, 需要装一个人插件, 就叫uuid
  // 这个 ParseUUIDPipe 管道, 主要用于验证接收参数是否为一个 uuid, 如果不是uuid, 是不会通过的
  getUUIDPipe(@Param('id', ParseUUIDPipe) id) {
    console.info(typeof id, id);
    return id;
  }

  /* @Post()
  // 使用Body装饰器
  create(@Body() body, @Request() req, @Body('name') name) {
    console.info(req.body);
    return {
      code: 200,
      name: body.name,
      message: name,
    };
  } */

  @Get('code')
  createCode(@Response() res, @Session() session) {
    const captcha = this.userService.getCaptcha();
    // 这里使用response发送数据返回给前端
    // 记录session
    // ! send执行完成后, 响应结束, session等字段无法继续写入值
    session.code = captcha.text;
    res.type('image/svg+xml');
    res.send(captcha.data); // 直接返回图片
  }

  @Post('create')
  createUser(@Body() body, @Session() session) {
    if (!session.code) {
      return {
        code: Code.NO_SERVER_VERIFY_CODE,
        msg: '验证码已过期!',
      }
    }
    if (!body?.code) {
      return {
        code: Code.NO_CLIENT_VERIFY_CODE,
        msg: '请输入验证码!',
      }
    }
    if (session.code.toLocaleLowerCase() !== body.code.toLocaleLowerCase()) {
      return {
        code: Code.ERROR_VERIFY_CODE,
        msg: '请输入正确的验证码!',
      };
    }
    return {
      code: Code.SUCCESS,
    };
  }
}
