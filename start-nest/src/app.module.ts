import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { UsersModule } from './users/users.module';
import { WorkspacesModule } from './workspaces/workspaces.module';
import { ChannelsModule } from './channels/channels.module';
import { DmsModule } from './dms/dms.module';
import { UsersService } from './users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/Users';

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
  imports: [
    // 모든 모듈에서 process.env를 쓸수 있따.
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    WorkspacesModule,
    ChannelsModule,
    DmsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      // entities: ['entities/*.ts'], // 이렇게 하면 dist에 있는 파일을 못찾음
      autoLoadEntities: true, // 자동으로 entities를 로드해줌, 밑에 forFeature인식, 버그 있으면 위에꺼 사용
      // entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true, // 개발때만 true, 운영에서는 false
      logging: true, // ORM이 쿼리를 보여줌
      // 서버가 꺼져도 DB연결을 유지해줌
      keepConnectionAlive: true, // 자꾸 저장하면 서버 재시작하는데 DB 끊기니까 이걸로 연결 유지
      charset: 'utf8mb4', // 이모티콘까지 가능
    }),
    TypeOrmModule.forFeature([Users]),
  ],
  controllers: [AppController],
  providers: [AppService, UsersService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    // 모든 라우트에 미들웨어 적용
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
