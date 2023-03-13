import {
  // MiddlewareConsumer,
  Module,
  // NestModule,
  // RequestMethod
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
// import { LoggerMiddleware } from '@/middleware/index';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
/* export class UserModule implements NestModule {
  // 接收一个 消费者 consumer
  configure(consumer: MiddlewareConsumer) {
    // 使用 consumer 注册中间件
    // 需调用 forRoutes, 指定路由
    // consumer.apply(LoggerMiddleware).forRoutes('/')
    // forRoutes除了直接传递字符串, 也可以是一个配置项, 只用于限制某个类型的path
    consumer.apply(LoggerMiddleware).forRoutes({
      path: 'user',
      // 这里只限制get方法
      method: RequestMethod.GET,
      // 限制版本号
      version: '1'
    });
    // 也可以直接添加Controller, 那么当前拦截器下所有请求都被拦截
    // consumer.apply(LoggerMiddleware).forRoutes(UserController)
  }
} */
