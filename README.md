# RS School REST service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Docker

- Docker - [Download & Install Docker](https://www.docker.com/).

```
1. npm run docker:dev - создание и запуск контейнеров 
```
```
2. Дождаться коннекта с базой(сообщение в консоле **Connect to db**)
```
```
3. npm run db:migrate - запуск миграций 
```
```
4. npm run test - запуск тестов 
```
After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm test
```

To run only one of all test suites (users, boards or tasks)

```
npm test <suite name>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization (users, boards or tasks)

```
npm run test:auth <suite name>
```
```
artillery test 

## Express
![express test](./artillery/express.png)

## Fastify
![Fastify test](./artillery/fastify.png)
```

