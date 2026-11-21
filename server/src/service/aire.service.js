import AireHorario from '../models/AireHorario.js';
import { consultarPagina } from './paginacion.js';

export function buscar(filters, page, limit) {
    const filtro = {};

    if (filters.desde || filters.hasta) {
        filtro.ts = {};
        if (filters.desde) filtro.ts.$gte = filters.desde;
        if (filters.hasta) filtro.ts.$lte = filters.hasta;
    }
    if (filters.estacion_id) filtro['meta.estacion_id'] = filters.estacion_id;
    if (filters.magnitud) filtro['meta.magnitud'] = filters.magnitud;
    if (filters.magnitud_cod !== undefined) filtro['meta.magnitud_cod'] = filters.magnitud_cod;

    return consultarPagina(AireHorario, filtro, { ts: 1, _id: 1 }, page, limit);
}
