import 'reflect-metadata';
import { createConnection } from 'typeorm';
import CONFIG from './common/config';
import app from './app';
import ORMConfig from './ormconfig';

const PORT = CONFIG.PORT || 4000;

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);

(async () => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 10000));
    await createConnection(ORMConfig);
    console.log('Connect to db');
  } catch (error) {
    console.log(error);
  }
})();
