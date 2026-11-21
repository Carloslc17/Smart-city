import TraficoRegistro from '../models/TraficoRegistro.js';
import { consultarPagina } from './paginacion.js';

export function buscar(filters, page, limit) {
    const filtro = {};

    if (filters.desde || filters.hasta) {
        filtro.ts = {};

        if (filters.desde) {
            filtro.ts.$gte = filters.desde;
        }

        if (filters.hasta) {
            filtro.ts.$lte = filters.hasta;
        }
    }

    if (filters.idelem !== undefined) {
        filtro['meta.idelem'] = filters.idelem;
    }

    if (filters.tipo_elem) {
        filtro['meta.tipo_elem'] = filters.tipo_elem;
    }
    
    return consultarPagina(TraficoRegistro, filtro, { ts: 1, _id: 1 }, page, limit);
}
