import { ApiProperty, PickType } from '@nestjs/swagger';
import { Users } from 'src/entities/Users';

export class JoinRequestDto extends PickType(Users, [
  'email',
  'nickname',
  'password',
] as const) {}

// 인터페이스는 컴파일시 사라짐
// 클래스는 컴파일시에도 남아있음
// 자바스크립트 단에서 타입, 밸리데이션을 체크할 수 있게 해줌
