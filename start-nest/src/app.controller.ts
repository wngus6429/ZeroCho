import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

// @Controller('abc')
@Controller() // 공통주소
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello') // GET /abc/hello 세부주소 설정
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('hi') // POST /abc/hi 세부주소 설정
  postHello(): string {
    return this.appService.postHello();
  }
}
