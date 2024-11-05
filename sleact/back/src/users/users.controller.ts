import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JoinRequestDto } from './dto/join.request.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from 'src/common/dto/user.dto';
import { User } from 'src/common/decorators/user.decorator';
import { UndefinedToNullInterceptor } from 'src/common/intercepters/undefinedToNull.interceptor';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { LoggedInGuard } from 'src/auth/logged-in.guard';
import { NotLoggedInGuard } from 'src/auth/not-logged-in.guard';

// 컨트롤러에서는 최대한 req 안 쓰는게 좋음
@UseInterceptors(UndefinedToNullInterceptor) // 모든 컨트롤러에 결과가 undefined인건 null로 바꿈
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
  getUsers(@User() user) {
    // @User() 데코레이터를 사용하면 req.user를 가져올 수 있음
    return user || false;
  }

  @ApiResponse({
    status: 200, // ApiOkResponse쓰면 알아서 status 200됨
    description: '회원가입 성공',
    type: UserDto,
  })
  @UseGuards(new NotLoggedInGuard())
  @ApiOperation({ summary: '회원가입' }) // swagger 문서화
  @Post()
  async join(@Body() body: JoinRequestDto) {
    console.log('바디', body);
    await this.userService.join(body.email, body.nickname, body.password);
  }

  @ApiResponse({
    status: 200, // ApiOkResponse쓰면 알아서 status 200됨
    description: '로그인 성공',
    type: UserDto,
  })
  @Post('login')
  @UseGuards(new LocalAuthGuard()) // 주로 권한을 체크할때, 인터셉터보다 먼저 실행됨
  @ApiOperation({ summary: '로그인' }) // swagger 문서화
  logIn(@User() user) {
    return user;
  }

  @UseGuards(new LoggedInGuard())
  @ApiOperation({ summary: '로그아웃' }) // swagger 문서화
  @Post('logout')
  logOut(@Req() req, @Res() res) {
    // 원래 Req, Res는 안쓰는게 좋음, 이 경우 어쩔수가 없음
    req.logOut();
    res.clearCookie('connect.sid', { httpOnly: true });
    res.send('ok');
  }
}
