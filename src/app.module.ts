import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DemoController } from './demo/demo.controller';
import { DemoModule } from './demo/demo.module';
import { UserModule } from './user/user.module';
import { AppService2 } from './app2.service';
import { ListModule } from './list/list.module';
import { ConfigModule } from '@/config/config.module';
import { UploadModule } from './upload/upload.module';
import { LoginModule } from './login/login.module';
import { SpiderModule } from './spider/spider.module';
import { GuardModule } from './guard/guard.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbTstModule } from './db-tst/db-tst.module';
console.info(process.env.NODE_ENV === 'development');
@Module({
  imports: [
    DemoModule,
    UserModule,
    ListModule,
    ConfigModule.forRoot({ isTeacher: true }),
    UploadModule,
    LoginModule,
    SpiderModule,
    GuardModule,
    TypeOrmModule.forRoot({
      type: 'mysql', // 数据库类型
      username: 'root', // 用户名
      password: '123456', // 链接密码
      port: 3306, // 端口号
      database: 'tst_db', // 数据库名称
      entities: [__dirname + '/**/*.entity{.ts, .js}'], // 实体文件
      synchronize: process.env.NODE_ENV === 'development', // synchronize 代表是否自动将实体类同步到数据库, 不建议生产环境开启
      retryDelay: 500, // 重试连接数据库间隔
      retryAttempts: 10, // 重试连接数据库的次数
      autoLoadEntities: true, // 如果为 true 将自动加载实体 forFeature() 方法注册的每个实体都讲自动添加到配置对象的实体数组中
      // ? 所谓实体就是 entities 中的内容
    }),
    DbTstModule,
  ],
  controllers: [AppController, DemoController],
  // providers: [AppService], // 简写
  providers: [
    AppService2,
    // 展开
    {
      provide: 'Fuck',
      useClass: AppService,
    },
    {
      provide: 'InjectValue',
      // 类型是any, 随便都行
      useValue: ['tb', 'pxx', 'jd'],
    },
    {
      provide: 'Factory',
      // 这里需要将服务类注入工厂配置
      inject: [AppService2],
      // 工厂模式, useFactory是一个函数工厂
      // 可以聚合和转发任意 service
      // 注入进工厂配置后, 这个Service实例就可以作为工厂的参数
      // 同时工厂还支持异步处理
      async useFactory(appService2: AppService2) {
        console.info(appService2.getHello(), '123123');
        return await new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              num: 123,
              fuck: '草拟吗',
            });
            // 这里设置延迟, 会等待延迟结束服务才会启动完成
          });
        });
      },
    },
  ],
})
export class AppModule {}
