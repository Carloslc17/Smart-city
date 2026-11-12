import PuntoTransporte from '../models/PuntoTransporte.js';

export const getAll = () => PuntoTransporte.find().sort({ _id: 1 }).lean();
export const getById = (id) => PuntoTransporte.findById(id).lean();
