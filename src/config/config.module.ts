import { Global, Module, DynamicModule } from '@nestjs/common';

const configService = {
  provide: 'configService',
  useValue: {
    baseUrl: '/api',
  },
};

const dynConfig = (options: any) => ({
  provide: 'dynConfigService',
  useValue: {
    dynConfig: "草拟吗",
    options
  }
})
// 使用 Global装饰器修饰 module, 就会将这个 module 注册为全局模块, 无论在何处, 均可进行inject
@Global()
@Module({
  providers: [configService],
  // - 当然, 就算模块是全局的, 他的 providers 要被其他模块使用, 也需要导出
  exports: [configService],
})
export class ConfigModule {
  static forRoot(options: any): DynamicModule {
    const dynService = dynConfig(options);
    // 声明为动态模块
    return {
      module: ConfigModule,
      providers: [
        dynService
      ],
      exports: [dynService]
    }
  }
}
