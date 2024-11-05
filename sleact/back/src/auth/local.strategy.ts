import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email', passwordField: 'password' });
  }

  async validate(email: string, password: string, done: CallableFunction) {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return done(null, user); // local.serializer.ts 시리얼라이즈 유저 호출 되는거임
    // 시리얼라이즈가 뭔지 모르면 노드강좌 필요함
  }
}

// 일반적으로 serialize user는 다음과 같은 경우에 필요
// 1. 클라이언트에 반환할 사용자 객체 준비: 사용자의 민감한 정보를 제외하고,
// 필요한 정보만 선택하여 객체를 새로 구성.
// 2. 세션이나 JWT 토큰에 저장하기 위해 변환: 세션에 저장할 경우에는
//  사용자 ID나 필요한 최소 정보만 저장하여 서버 부담을 줄이고, 보안을 강화할 수 있음.

//즉, 사용자 데이터를 직렬화하여 클라이언트에 전달하거나 세션에 저장하는 과정을 의미하는 것이 시리얼라이즈 유저입니다.
