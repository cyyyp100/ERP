import { createApp } from './app';
import { env } from './config/env';

const app = createApp();

app.listen(env.port, () => {
  console.log(`JJ Events API démarrée sur le port ${env.port}`);
});
