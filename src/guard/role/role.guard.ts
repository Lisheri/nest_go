import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import type { Request } from 'express';

// guard需要实现 CanActivate 接口, 主要是要实现 canActive 函数
// canActive需要返回一个boolean, 或者Promise的boolean, 或则是可观察的boolean
@Injectable()
export class RoleGuard implements CanActivate {
  // 使用智能守卫, 需要注入 reflector
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // 注入了 reflector 后, 需要进行反射, get的参数就是在 controller 中通过 SetMetadata装饰器注入的 第一个参数key
    // 第二个参数需要传入一个函数体 这里为获取, 使用 context.getHandler 即可, 然后就可以获取到 对应的 controller 方法传入的元数据了
    // 这里需要添加泛型, 否则无法推断, 因为元数据是自定义的
    const admin = this.reflector.get<string[]>(
      'role',
      context.getHandler(),
    ) || ['admin'];
    const query = context.switchToHttp().getRequest<Request>().query;
    console.info('经过守卫', admin);
    if (admin && admin.includes(query.role as string)) {
      // 比如这里使用守卫约束参数内必须含有admin, 才能够访问
      console.info('ok');
      return true;
    }
    // 如果是返回false, 那么会直接打到403
    return false;
  }
}
