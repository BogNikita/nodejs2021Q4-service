import Koa from 'koa';
import Router from 'koa-router';
import koaBody from 'koa-body';
import bodyparser from 'koa-bodyparser';
import path from 'path';
import YAML from 'yamljs';
import { koaSwagger } from 'koa2-swagger-ui';
import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import tasksRouter from './resources/tasks/task.router';
import logger from './middleware/logger';
import { Logger } from './logger';

const app = new Koa();
const router = new Router();

const spec = YAML.load(path.join(__dirname, '../doc/api.yaml')) as
  | Record<string, unknown>
  | undefined;

router.get(
  '/doc',
  koaSwagger({ routePrefix: false, swaggerOptions: { spec } })
);

router.use('/users', userRouter.routes());
router.use('/boards', boardRouter.routes());
router.use('/boards', tasksRouter.routes());

app.use(bodyparser());
app.use(koaBody());
app.use(logger);
app.use(router.routes());
app.use(router.allowedMethods());

const handleException = (err: Error) => {
  const isError = true;
  const message = `Uncaught Exception Error: ${err.message}`;
  const loggerHandleException = new Logger({ isError, message });
  (() => {
    loggerHandleException.writeInFile().catch(console.log);
  })();
  process.exit(1);
};

const handleRejectedPromise = (err: Error) => {
  const isError = true;
  const message = `Unhandled Rejection Error: ${err.message}`;
  const handleRejectedPromiseLogger = new Logger({ isError, message });
  (() => {
    handleRejectedPromiseLogger.writeInFile().catch(console.log);
  })();
  process.exit(1);
};

(() => {
  process.on('uncaughtException', handleException);
  process.on('unhandledRejection', handleRejectedPromise);
})();

// throw Error('Oops!');

// Promise.reject(Error('Oops!'));

export default app;
