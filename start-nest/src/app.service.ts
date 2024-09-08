import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '먼데Hello Worddldasdasda!';
  }
  postHello(): string {
    return '와잌씨';
  }
}
