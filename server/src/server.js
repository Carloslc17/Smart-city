import app from './app.js';
import { env, validateEnv } from './config/env.js';

validateEnv();

app.listen(env.port, () => {
  console.log(`API escuchando en http://localhost:${env.port}`);
});