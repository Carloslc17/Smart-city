import Distrito from '../models/Distrito.js';

export const getAll = () => Distrito.find().sort({ _id: 1 }).lean();
export const getById = (id) => Distrito.findById(id).lean();
export const add = (distrito) => Distrito.create(distrito);
export const update = (id, distrito) => Distrito.findByIdAndUpdate(id, distrito, {new: true}).lean();
export const remove = (id) => Distrito.findByIdAndDelete(id).lean();
