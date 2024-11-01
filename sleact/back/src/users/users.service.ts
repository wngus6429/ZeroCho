import {
  BadRequestException,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    // 레포지토리는 서비스랑 테이블인 엔티티를 연결해줌
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  getUsers() {}

  // asnyc 에서는 throw 를 쓰면 에러를 잡을 수 있음
  async join(email: string, nickname: string, password: string) {
    //! User 엔티티에서 class-validator 데코레이터를 사용하면 이런식으로 검증할 필요가 없음
    // if (!email) {
    //   // throw는 리턴 기능이 있음, httpexception.filter.ts로 감
    //   // BadRequestException 은 400 에러를 던짐
    //   throw new BadRequestException('이메일이 없습니다.');
    // }
    // if (!nickname) {
    //   throw new BadRequestException('닉네임이 없습니다.'0);
    // }
    // if (!password) {
    //   throw new BadRequestException('비밀번호가 없습니다.');
    // }
    const user = await this.usersRepository.findOne({ where: { email } });
    console.log('user', user);
    if (user) {
      throw new UnauthorizedException('이미 존재하는 사용자입니다.');
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    await this.usersRepository.save({
      email,
      nickname,
      password: hashedPassword,
    });
  }
}
