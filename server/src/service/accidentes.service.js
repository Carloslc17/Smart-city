import Accidente from '../models/Accidente.js';
import { consultarPagina } from './paginacion.js';

export function buscar(filters, page, limit) {
    const filtro = {};

    if (filters.desde || filters.hasta) {
        filtro.fecha = {};
        if (filters.desde) filtro.fecha.$gte = filters.desde;
        if (filters.hasta) filtro.fecha.$lte = filters.hasta;
    }
    if (filters.distrito) filtro.distrito = filters.distrito;
    if (filters.distrito_cod !== undefined) filtro.distrito_cod = filters.distrito_cod;
    if (filters.tipo_accidente) filtro.tipo_accidente = filters.tipo_accidente;
    if (filters.gravedad_max) filtro.gravedad_max = filters.gravedad_max;

    return consultarPagina(Accidente, filtro, { fecha: 1, _id: 1 }, page, limit);
}
