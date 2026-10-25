import app from './app.js';
import { env, validateEnv } from './config/env.js';
import { connectDatabase, disconnectDatabase } from './config/database.js';

async function startServer() {
  validateEnv();
  await connectDatabase(env.mongoUri);


  const server = app.listen(env.port, () => {
    console.log(`API escuchando en http://localhost:${env.port}`);
  });

  let shuttingDown = false;
  async function shutdown(signal) {
    if (shuttingDown) return;
    shuttingDown = true;
    console.log(`Señal ${signal} recibida; cerrando servidor...`);

    try {
      await new Promise((resolve, reject) => {
        server.close((error) => (error ? reject(error) : resolve()));
      });
    } catch (error) {
      console.error('Error al cerrar el servidor HTTP:', error);
      process.exitCode = 1;
    } finally {
      try {
        await disconnectDatabase();
      } catch (error) {
        console.error('Error al cerrar la conexión con MongoDB:', error);
        process.exitCode = 1;
      }
    }
  }
  process.on('SIGINT', () => void shutdown('SIGINT'));
  process.on('SIGTERM', () => void shutdown('SIGTERM'));
}

startServer().catch((error) => {
  console.error('No se pudo iniciar el servidor:', error);
  process.exitCode = 1;
});