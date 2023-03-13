import { NestMiddleware, Injectable } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';

// 提供依赖
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  // 这里默认没有类型, 但由于当前nest基于express开发, 因此可以从express中获取类型
  use (req: Request, res: Response, next: NextFunction) {
    console.info('老汉儿来咯')
    // 这里同样可以使用res.send直接对常规错误进行拦截返回错误信息
    if (req.query.fuck) {
      res.send('你妈炸了');
    } else {
      // 必须执行next, 否则中间件会一直挂起, 请求处于pending
      next();
    }
  }
}