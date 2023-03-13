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

@Module({
  imports: [DemoModule, UserModule, ListModule, ConfigModule.forRoot({isTeacher: true}), UploadModule],
  controllers: [AppController, DemoController],
  // providers: [AppService], // 简写
  providers: [
    AppService2,
    // 展开
    {
      provide: 'Fuck',
      useClass: AppService
    },
    {
      provide: "InjectValue",
      // 类型是any, 随便都行
      useValue: ['tb', 'pxx', 'jd']
    },
    {
      provide: "Factory",
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
              fuck: '草拟吗'
            });
            // 这里设置延迟, 会等待延迟结束服务才会启动完成
          });
        })
      }
    }
  ]
})
export class AppModule {}
