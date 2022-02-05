import { Context } from 'koa';
import jwt from 'jsonwebtoken';
import config from '../common/config';

export default function authenticateToken() {
  return async (ctx: Context, next: () => Promise<void>) => {
    const exceptionRoute = ['/login', '/doc', '/'];
    if (exceptionRoute.includes(ctx.url)) {
      await next();
    } else {
      const authHeader = ctx.headers.authorization;
      const token = authHeader && authHeader.split(' ')[1];

      if (token == null) {
        ctx.status = 401;
        return;
      }

      jwt.verify(token, config.JWT_SECRET_KEY, (err) => {
        if (err) {
          ctx.status = 403;
          return;
        }
      });
      await next();
    }
  };
}
