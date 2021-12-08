import Koa from 'koa';
import Router from 'koa-router';
import koaBody from 'koa-body';
import path from 'path';
import YAML from 'yamljs';
import { koaSwagger } from 'koa2-swagger-ui';
import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import tasksRouter from './resources/tasks/task.router';

const app = new Koa();
const router = new Router();

const spec = YAML.load(path.join(__dirname, '../doc/api.yaml')) as
  | Record<string, unknown>
  | undefined;

if (spec) {
  router.get(
    '/doc',
    koaSwagger({ routePrefix: false, swaggerOptions: { spec } })
  );
}

router.use('/users', userRouter.routes());
router.use('/boards', boardRouter.routes());
router.use('/boards', tasksRouter.routes());

app.use(koaBody());
app.use(router.routes());
app.use(router.allowedMethods());

export default app;
