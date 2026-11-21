import Distrito from '../models/Distrito.js';

export const getAll = () => Distrito.find().sort({ _id: 1 }).lean();
export const getById = (id) => Distrito.findById(id).lean();
