import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator((_, ctx: ExecutionContext) => {
  // switchToHttp()
  // http からリクエストを取得する
  const request = ctx.switchToHttp().getRequest();

  // この user は、JwtStrategy の validate メソッドの返り値がリクエストオブジェクトのプロパティになる
  return request.user;
});
