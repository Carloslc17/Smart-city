import Contenedor from '../models/Contenedor.js';

export const getAll = () => Contenedor.find().sort({ _id: 1 }).lean();
export const getById = (id) => Contenedor.findById(id).lean();
