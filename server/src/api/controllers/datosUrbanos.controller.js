import AppError from '../../utils/AppError.js';
import * as accidentesService from '../../service/accidentes.service.js';
import * as aireService from '../../service/aire.service.js';
import * as traficoService from '../../service/trafico.service.js';

// Limites de paginacion
const DEFAULT_LIMIT = 50; 
const MAX_LIMIT = 100;     
const MAX_PAGE = 1_000_000;

// Convierte y valida texto (String)
function getString(query, name) {
    const value = query[name];
    if (value === undefined) return undefined;
    if (typeof value !== 'string' || value.trim() === '') {
        throw new AppError(`El parámetro "${name}" debe ser un texto no vacío`, 400);
    }
    return value.trim();
}

// Convierte y valida enteros
function getInteger(query, name, fallback, maximum = Number.MAX_SAFE_INTEGER) {
    const value = getString(query, name);
    if (value === undefined && fallback !== undefined) return fallback;

    const parsed = Number(value);
    if (!Number.isSafeInteger(parsed) || parsed < 1 || parsed > maximum) {
        throw new AppError(`El parámetro "${name}" debe ser un entero entre 1 y ${maximum}`, 400);
    }
    return parsed;
}

// Coniverte y valida enteros opcionales
function getOptionalInteger(query, name) {
    const value = getString(query, name);
    if (value === undefined) return undefined;

    const parsed = Number(value);
    if (!Number.isSafeInteger(parsed)) {
        throw new AppError(`El parámetro "${name}" debe ser un entero`, 400);
    }
    return parsed;
}

// Convierte y valida fechas en formato ISO (YYYY-MM-DD)
function getDate(query, name) {
    const value = getString(query, name);
    if (value === undefined) return undefined;
    const match = value.match(/^(\d{4})-(\d{2})-(\d{2})(?:T.*)?$/);
    if (!match || Number.isNaN(Date.parse(value))) {
        throw new AppError(`El parámetro "${name}" debe ser una fecha ISO válida`, 400);
    }

    const [, year, month, day] = match;
    const calendarDate = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
    if (
        calendarDate.getUTCFullYear() !== Number(year)
        || calendarDate.getUTCMonth() !== Number(month) - 1
        || calendarDate.getUTCDate() !== Number(day)
    ) {
        throw new AppError(`El parámetro "${name}" debe ser una fecha ISO válida`, 400);
    }

    return new Date(value);
}

/* Controla filtros compartidos por trafico, aire y accidentes
*  Filtros de tiempo: Intervalo de fecha inferior a fecha superior
*/
function getSearchOptions(query) {
    const desde = getDate(query, 'desde');
    const hasta = getDate(query, 'hasta');
    if (desde && hasta && desde > hasta) {
        throw new AppError('"desde" no puede ser posterior a "hasta"', 400);
    }

    return {
        filters: { desde, hasta },
        page: getInteger(query, 'page', 1, MAX_PAGE),
        limit: getInteger(query, 'limit', DEFAULT_LIMIT, MAX_LIMIT),
    };
}

// Filtros accidentes: distrito, codigo distrito, tipo de accidente y gravedad maxima
export const getAccidentes = async (req, res) => {
    const options = getSearchOptions(req.query);
    options.filters.distrito = getString(req.query, 'distrito');
    options.filters.distrito_cod = getOptionalInteger(req.query, 'distrito_cod');
    options.filters.tipo_accidente = getString(req.query, 'tipo_accidente');
    options.filters.gravedad_max = getString(req.query, 'gravedad_max');
    res.json(await accidentesService.buscar(options.filters, options.page, options.limit));
};

// Filtros de calidad del aire: estacion, magnitud e id de magnitud
export const getCalidadAire = async (req, res) => {
    const options = getSearchOptions(req.query);
    options.filters.estacion_id = getString(req.query, 'estacion_id');
    options.filters.magnitud = getString(req.query, 'magnitud');
    options.filters.magnitud_cod = getOptionalInteger(req.query, 'magnitud_cod');
    res.json(await aireService.buscar(options.filters, options.page, options.limit));
};

// Filtros de trafico: id y carretera
export const getTrafico = async (req, res) => {
    const options = getSearchOptions(req.query);
    options.filters.idelem = getOptionalInteger(req.query, 'idelem');
    options.filters.tipo_elem = getString(req.query, 'tipo_elem');
    res.json(await traficoService.buscar(options.filters, options.page, options.limit));
};
