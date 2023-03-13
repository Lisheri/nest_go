import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World';
  }
  getTstFuck(): string {
    return '你妈炸了!赶紧回去看看!'
  }
}
