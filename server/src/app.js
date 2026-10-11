import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import { env } from './config/env.js';
import { notFound, errorHandler } from './api/middlewares/errorHandler.js';

const app = express();

// --- Middlewares globales ---
app.use(helmet());
app.use(cors({ origin: env.clientUrl }));
app.use(express.json());
if (env.nodeEnv !== 'test') {
  app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));
}

// --- Rutas ---
app.get('/api/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// --- Manejo de errores ---
app.use(notFound);
app.use(errorHandler);

export default app;