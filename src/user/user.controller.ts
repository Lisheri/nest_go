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
} from '@nestjs/common'; // 参数装饰器
import { Code } from 'src/constants';
import { UserService } from './user.service';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

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
