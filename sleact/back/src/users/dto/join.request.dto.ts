import { ApiProperty } from '@nestjs/swagger';

export class JoinRequestDto {
  @ApiProperty({
    example: 'wngus6429@gmail.com',
    description: '이메일',
    required: true,
  })
  public email: string;

  @ApiProperty({
    example: 'DreamingPark',
    description: '닉네임',
    required: true,
  })
  public nickname: string;

  @ApiProperty({
    example: '***',
    description: '비밀번호',
    required: true,
  })
  public password: string;
}

// 인터페이스는 컴파일시 사라짐
// 클래스는 컴파일시에도 남아있음
// 자바스크립트 단에서 타입, 밸리데이션을 체크할 수 있게 해줌
