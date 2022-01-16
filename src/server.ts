import 'reflect-metadata';
import { createConnection } from 'typeorm';
import CONFIG from './common/config';
import app from './app';
import ORMConfig from './ormconfig';

const PORT = CONFIG.PORT || 4000;

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);

(() => {
  const int = setInterval(() => {
    createConnection(ORMConfig).then(() => {
      clearInterval(int);
      console.log('Connect to db');
    }).catch(() => {
      console.log('Waiting create db...');
    });
  }, 3000);
})();
