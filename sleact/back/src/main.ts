import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { HttpExceptionFilter } from './httpException.FIlter';
import { ValidationPipe } from '@nestjs/common';
import passport from 'passport';
import session from 'express-session';
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  // 모든 http exception을 여기서 잡아서 처리함
  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalPipes(new ValidationPipe({
  //   transform:true  npm i class-transformer 해줘야함
  // }));
  app.useGlobalFilters(new HttpExceptionFilter());

  // Nest가 그냥 이렇게 쓰면 된다고 알려줌
  const config = new DocumentBuilder()
    .setTitle('Slack API')
    .setDescription('Slack 개발을 위한 API문서')
    .setVersion('1.0')
    .addCookieAuth('connect.sid')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use(cookieParser());
  app.use(
    session({
      resave: false,
      saveUninitialized: false,
      secret: process.env.COOKIE_SECRET,
      cookie: {
        httpOnly: true,
      },
    }),
  );
  app.use(passport.initialize());
  // 토큰 기반으로 할거면 아래 필요없음
  // 지금은 세션 기반으로 하기 때문에 필요함
  app.use(passport.session());
  await app.listen(port);
  console.log(`작동중 Listening on port ${port}`);
  ``;
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
