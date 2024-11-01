import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

// implements 하면 반드시 구현해야해서 강제사항이 생김
//라우터보다 먼저 실행됨
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl } = request;
    // 헤더에 user-agent가 없을 경우 ''로 처리
    const userAgent = request.get('user-agent') || '';

    // response.on은 라우터가 끝날때까지 기다림, 비동기로 동작
    response.on('finish', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');
      this.logger.log(
        `${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}`,
      );
    });
    // 미들웨어 쓸때 next()를 써줘야 다음으로 넘어감
    next();
  }
}
