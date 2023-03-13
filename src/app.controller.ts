import { Controller, Get, Inject, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './user/user.service';

// Controller装饰器可以声明当前路由根节点, 此时所有的路由都会加上get前缀
@Controller()
export class AppController {
  // 依赖注入, 声明 appService 为一段不可修改的, 并且是私有的 AppService
  // 但最终注入是依靠modules中的 Module 装饰器完成的, 在 Module 内有实例化并注入逻辑
  // 因此不需要实例化, 可以直接通过 执行上下文this 访问到 appService实例
  constructor(
    @Inject("Fuck") private readonly appService: AppService,
    @Inject("InjectValue") private readonly shop: string[],
    @Inject("Factory") private readonly factory: Record<string, any>,
    private readonly userService: UserService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("/fucker")
  getTstFuck(): string {
    return this.appService.getTstFuck();
  }

  @Get("/shop/:id")
  getShop(@Param("id") id: number): string {
    return this.shop[id];
  }

  @Get("/factory")
  tstFactory() {
    return this.factory;
  }

  @Get("/userModule")
  getUserFindAll() {
    return this.userService.findAll();
  }
}
