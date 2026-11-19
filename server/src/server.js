import mongoose from 'mongoose';
import app from './app.js';
import { env, validateEnv } from './config/env.js';

validateEnv();

async function startServer() {
  try {
    await mongoose.connect(env.mongoUri);
    app.listen(env.port, () => {
      console.log(`API escuchando en http://localhost:${env.port}`);
    });
  } catch (error) {
    console.error('No se pudo conectar a MongoDB:', error);
    process.exitCode = 1;
  }
}

startServer();