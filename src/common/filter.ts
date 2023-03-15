import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import type { Request, Response } from 'express';

type ExceptionType = Record<string, any>;

const getMessage = (exception: ExceptionType) => {
  return exception.message || exception.sqlMessage;
};

const getData = (exception: ExceptionType, message?: string) => {
  return (
    exception?.getResponse?.() || {
      data: {},
      code: -1,
      message: message || '接口调用错误, 请联系管理员',
    }
  );
};

// 全局异常拦截, 使用 Catch 装饰器
@Catch()
export class HttpFilter implements ExceptionFilter {
  // 这里不止是 HttpException类型, 还有其他类型的错误, 比如数据库错误等
  catch(exception: ExceptionType, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // 获取到context
    const request = ctx.getRequest<Request>(); // 除了 request, 还有response以及next
    const response = ctx.getResponse<Response>();
    const status = exception?.getStatus?.() || '500'; // 拿不到状态码就统一500
    const message = getMessage(exception);

    // 返回状态码以及错误信息
    response.status(status).json({
      success: false,
      time: new Date(),
      // 暴露错误响应一级错误信息
      data: { ...getData(exception, message) },
      status,
      path: request.url, // 可以获取到具体接口, 当然, 正常是没有这个的
    });
  }
}
