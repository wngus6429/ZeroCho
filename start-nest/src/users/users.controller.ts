import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { JoinRequestDto } from './dto/join.request.dto';
import { UsersService } from './users.service';

// 컨트롤러에서는 최대한 req 안 쓰는게 좋음
@Controller('api/users')
export class UsersController {
  constructor(private userService: UsersService) {}

  // 내정보 로그인된 사용자 정보
  @Get()
  getUsers(@Req() req) {
    return req.user;
  }

  // 회원가입
  @Post()
  postUsers(@Body() body: JoinRequestDto) {
    this.userService.postUsers(body.email, body.nickname, body.password);
  }

  @Post('login')
  logIn(@Req() req) {
    return req.user;
  }

  @Post('logout')
  logOut(@Req() req, @Res() res) {
    // 원래 Req, Res는 안쓰는게 좋음, 이 경우 어쩔수가 없음
    req.logOut();
    res.clearCookie('connect.sid', { httpOnly: true });
    res.send('ok');
  }
}
