import { createParamDecorator } from '@nestjs/common';

// @User() 데코레이터를 사용하면 req.user를 가져올 수 있음
// 중복을 줄이는 효과가 있음
export const User = createParamDecorator((data, ctx) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});
