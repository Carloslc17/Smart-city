import mongoose from 'mongoose';

export async function connectDatabase(uri) {
  await mongoose.connect(uri);
  console.log('Conexión con MongoDB establecida');
}

export async function disconnectDatabase() {
  await mongoose.disconnect();
  console.log('Conexión con MongoDB cerrada');
}

export function isDatabaseConnected() {
  return mongoose.connection.readyState === 1;
}