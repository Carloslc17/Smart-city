import Estacion from '../models/Estacion.js';

export const getAll = () => Estacion.find().sort({ _id: 1 }).lean();
export const getById = (id) => Estacion.findById(id).lean();
