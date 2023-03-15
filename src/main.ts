import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType, ValidationPipe } from '@nestjs/common';
import * as session from 'express-session'; // 引入所有api
// import type { Request, Response, NextFunction } from 'express';
import * as cors from 'cors';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { Response } from '@/common/response';
import { HttpFilter } from '@/common/filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// import { RoleGuard } from '@/guard/role/role.guard';

// ! 全局中间件, 不能使用类
// ? 先经过全局中间件, 在经过模块中间件
// 这里实现一个加白
// const whiteList = new Set(['/list'])
// function MiddleWareAll(req: Request, res: Response, next: NextFunction) {
//   console.info(req.path)
//   if (whiteList.has(req.path)) {
//     next()
//   } else {
//     res.send('狗东西, 没注册进你妈呢')
//   }
// }

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 使用 useStaticAssets 配置静态资源路径
  app.useStaticAssets(join(__dirname, 'images'), {
    // 配置访问前缀
    prefix: '/images',
  });
  app.useStaticAssets(join(__dirname, 'cos'), { prefix: '/cos' });
  app.enableVersioning({
    // 设置RESTful版本类型
    type: VersioningType.URI, // 表示版本添加到请求头中
  });
  // 允许跨域, 中间件的调用顺序是按照use顺序来的
  app.use(cors());
  // app.use(MiddleWareAll);
  console.info(session);
  // 注入session模块, 其实和express是一样的
  // 同时可以指定配置参数
  app.use(
    session({
      secret: 'fuck', // 生成服务端session签名
      name: 'fucker.sid',
      cookie: { httpOnly: true, maxAge: 999999999 },
      rolling: true, // 重新计算过期时间, 默认false
    }),
  );
  // 注入全局异常拦截器, 同样需要实例化
  app.useGlobalFilters(new HttpFilter());
  // 注入响应拦截器
  app.useGlobalInterceptors(new Response());
  app.useGlobalPipes(new ValidationPipe()); // 全局 transform pipe, 使用后就不用手动的再去搞了
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('fucker')
    .setDescription('不可描述')
    .setVersion('1')
    .build(); // swagger配置
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api-docs', app, document);
  // 使用全局守卫, 但是守卫一般使用局部的
  // app.useGlobalGuards(new RoleGuard());
  await app.listen(3000);
}
bootstrap();
