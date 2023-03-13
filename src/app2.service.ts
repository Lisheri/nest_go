import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService2 {
  getHello(): string {
    return 'App Service 2';
  }
  getTstFuck(): string {
    return '你妈炸了!赶紧回去看看!'
  }
}
