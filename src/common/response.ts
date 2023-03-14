import {
  NestInterceptor,
  CallHandler,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

interface Data<T> {
  data: T;
}

@Injectable()
export class Response<T = any> implements NestInterceptor {
  intercept(
    _context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<Data<T | Data<T>>> | Promise<Observable<Data<T | Data<T>>>> {
    // 必须实现 intercept 方法
    // rxjs的管道
    // 简单标准化后, 可以让前端通过code直接进行判断
    return next.handle().pipe(
      map((data: T | Data<T>) => {
        return (data as Data<T>).data
          ? { data: (data as Data<T>).data, ...data }
          : {
              data,
              code: 0,
              message: '牛逼',
              success: true,
            };
      }),
    );
  }
}
