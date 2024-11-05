import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Users } from '../entities/Users';
import { AuthService } from './auth.service';
import { LocalSerializer } from './local.serializer';
import { LocalStrategy } from './local.strategy';

@Module({
  // 남의 모듈이면 imports
  imports: [
    // 토큰 기반 할거면 session: false 해야함
    PassportModule.register({ session: true }),
    TypeOrmModule.forFeature([Users]), // 레포지토리를 사용하기 위해
  ],
  // injectable이 붙은게 프로바이더
  providers: [AuthService, LocalStrategy, LocalSerializer],
})
export class AuthModule {}
