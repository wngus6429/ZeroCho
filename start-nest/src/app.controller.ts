import { Controller, Get, Inject, Post } from '@nestjs/common';
import { AppService } from './app.service';

// @Controller('abc')
@Controller() // 공통주소
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get() // GET /abc/hello 세부주소 설정
  getHello() {
    return this.appService.getHello();
    // new AppService().getHello(); // dependency injection 이 안되서 위 방법으로함
    // return this.appService.getHello();
  }
}
