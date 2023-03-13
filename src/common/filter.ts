import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import type { Request, Response } from 'express';

// 全局异常拦截, 使用 Catch 装饰器
@Catch()
export class HttpFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // 获取到context
    const request = ctx.getRequest<Request>(); // 除了 request, 还有response以及next
    const response = ctx.getResponse<Response>();

    const status = exception.getStatus();

    // 返回状态码以及错误信息
    response.status(status).json({
      success: false,
      time: new Date(),
      // 暴露错误响应一级错误信息
      data: exception.getResponse(),
      message: exception.message,
      status,
      path: request.url // 可以获取到具体接口, 当然, 正常是没有这个的
    })
  }
}


