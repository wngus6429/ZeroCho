import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './middlewares/logger.middleware';

const getEnv = async () => {
  // await axios.get('비밀키요청') 이런식으로도 가능, 외부서버에서 AWS에서 비밀키를 가져옴
  return {
    // .env 파일에 있는 변수들을 여기서 정의
    NAME: process.env.NAME,
  };
};

@Module({
  // 이걸로 .env 파일을 읽어올 수 있음
  // imports: [ConfigModule.forRoot({ isGlobal: true, load: [getEnv] })],
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    // 모든 라우트에 미들웨어 적용
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
