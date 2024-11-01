import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;

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
  await app.listen(port);
  console.log(`작동중 Listening on port ${port}`);
  ``;
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  // app.use(
  //   session({
  //     resave: false,
  //     saveUninitialized: false,
  //     secret: process.env.COOKIE_SECRET,
  //     cookie: {
  //       httpOnly: true,
  //     },
  //   }),
  // );
}
bootstrap();
