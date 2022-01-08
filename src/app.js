const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body');
const path = require('path');
const YAML = require('yamljs');
const swagger = require('koa2-swagger-ui');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const tasksRouter = require('./resources/tasks/task.router');

const app = new Koa();
const router = new Router();

const spec = YAML.load(path.join(__dirname, '../doc/api.yaml'));

router.get('/doc', swagger.koaSwagger({ routePrefix: false, swaggerOptions: {spec} }));

router.use('/users', userRouter());
router.use('/boards', boardRouter());
router.use('/boards', tasksRouter());

app.use(koaBody());
app.use(router.routes());
app.use(router.allowedMethods());

module.exports = app;
