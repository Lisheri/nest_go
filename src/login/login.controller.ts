import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
// import { LoginPipe } from './login/login.pipe';

@Controller({
  path: 'login',
  version: '1'
})
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  // 使用 LoginPipe 管道, 用法就是直接往装饰器里面塞入即可
  // LoginPipe 本质上就是一个实现了 transform 的类
  // create(@Body(LoginPipe) createLoginDto: CreateLoginDto) {
  // ? 正常情况下我们不需要手写 LoginPipe 这类 transform 类的管道, 因为一个一个的实现会过于繁琐, 不利于项目进行
  // ? 因此一般情况下, 我们可以直接使用nestjs提供的就好
  // * 可以看到nestjs自带的transform pipe, 发送后, 不会像上述实现的一样, 带有错误的明细, 而是将message, 收录到response.data.message这个数组中
  create(@Body() createLoginDto: CreateLoginDto) {
    return this.loginService.create(createLoginDto);
  }

  @Get()
  findAll() {
    return this.loginService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loginService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLoginDto: UpdateLoginDto) {
    return this.loginService.update(+id, updateLoginDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loginService.remove(+id);
  }
}
