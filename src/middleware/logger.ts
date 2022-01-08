import { Context } from 'koa';
import { Logger } from '../logger';

export default async (ctx: Context, next: () => Promise<void>) => {
  await next();
  const { url, method, querystring: query } = ctx.request;
  const body = ctx.request.body as object;
  const { status, message } = ctx.response;
  const params = ctx.params as object;

  let isError = false;

  if (status > 399) {
    isError = true;
  }

  const logger = new Logger({
    url,
    body,
    method,
    params,
    status,
    query,
    isError,
    message,
  });
  await logger.writeInFile();
};
