import { createParamDecorator } from '@nestjs/common';

// @Token() token 이런식으로 사용하면 req.token을 가져올 수 있음
// 중복을 줄이는 효과가 있음
export const Token = createParamDecorator((data, ctx) => {
  const response = ctx.switchToHttp().getRequest();
  return response.locals.jwt;
});
