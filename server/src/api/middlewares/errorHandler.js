import { env } from '../../config/env.js';

// 404 para rutas que no existen
export function notFound(req, _res, next) {
  const error = new Error(`Ruta no encontrada: ${req.method} ${req.originalUrl}`);
  error.status = 404;
  next(error);
}
export function errorHandler(err, _req, res, _next) {
  const status = err.status ?? 500;

  if (status >= 500) console.error(err);

  res.status(status).json({
    error: {
      message: status >= 500 && env.nodeEnv === 'production' ? 'Error interno del servidor' : err.message,
      status,
    },
  });
}