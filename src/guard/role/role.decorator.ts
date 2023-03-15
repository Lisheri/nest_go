import {
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
  // applyDecorators // 组合装饰器
} from '@nestjs/common';
import type { Request } from 'express';

// 自定义装饰器
export const Role = (...args: string[]) => SetMetadata('role', args);

// data为使用装饰器时传入的参数
// ctx 为上下文
export const ReqUrl = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<Request>();
    console.info(data, '-----------------');
    return req.url;
  },
);
