import { Injectable } from '@nestjs/common';
import { UsersService } from './users/users.service';
// import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private usersService: UsersService) {}
  async getHello() {
    this.usersService.getUsers();
  }
}

// @Injectable()
// export class AppService {
//   constructor(
//     private readonly configService: ConfigService,
//     ConfigService,
//   ) {}
//   getHello(): string {
//     // return process.env.SECRET;
//     // 개선버전, process.env.NAME 대신 ConfigService 사용
//     // 네스트가 .env 파일을 읽어올 수 있게 해주는 ConfigService를 사용
//     // 엮어서 사용하고, 테스트도 좋게 하게끔, 의존성 등을 주입할떄도
//     return this.configService.get('NAME')
//   }
// }
