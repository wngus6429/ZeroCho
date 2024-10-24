import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { JoinRequestDto } from './dto/join.request.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from 'src/common/dto/user.dto';

// 컨트롤러에서는 최대한 req 안 쓰는게 좋음
@ApiTags('USER')
@Controller('api/users')
export class UsersController {
  constructor(private userService: UsersService) {}

  // 내정보 로그인된 사용자 정보
  @ApiResponse({
    status: 200,
    description: '내 정보 조회 성공',
    type: UserDto,
  })
  @ApiResponse({
    status: 500,
    description: '서버에러',
  })
  @Get()
  @ApiOperation({ summary: '내 정보 조회' })
  getUsers(@Req() req) {
    return req.user;
  }

  @ApiResponse({
    status: 200, // ApiOkResponse쓰면 알아서 status 200됨
    description: '회원가입 성공',
    type: UserDto,
  })
  @ApiOperation({ summary: '회원가입' }) // swagger 문서화
  @Post()
  postUsers(@Body() body: JoinRequestDto) {
    this.userService.postUsers(body.email, body.nickname, body.password);
  }

  @ApiResponse({
    status: 200, // ApiOkResponse쓰면 알아서 status 200됨
    description: '로그인 성공',
    type: UserDto,
  })
  @Post('login')
  @ApiOperation({ summary: '로그인' }) // swagger 문서화
  logIn(@Req() req) {
    return req.user;
  }

  @Post('logout')
  @ApiOperation({ summary: '로그아웃' }) // swagger 문서화
  logOut(@Req() req, @Res() res) {
    // 원래 Req, Res는 안쓰는게 좋음, 이 경우 어쩔수가 없음
    req.logOut();
    res.clearCookie('connect.sid', { httpOnly: true });
    res.send('ok');
  }
}
