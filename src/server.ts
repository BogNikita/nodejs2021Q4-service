import CONFIG from './common/config';
import app from './app';

const PORT = CONFIG.PORT || 4000;

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);
