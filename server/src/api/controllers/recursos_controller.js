import * as distritosService from '../../service/gestorDistritos.js';
import * as estacionesService from '../../service/gestorEstaciones.js';
import * as contenedoresService from '../../service/gestorContenedores.js';
import * as puntosTransporteService from '../../service/gestorPuntosTransporte.js';

export const getDistritos = async (_req, res) => {
    res.json(await distritosService.getAll());
};

export const getDistrito = async (req, res) => {
    const distrito = await distritosService.getById(req.params.id);
    if (!distrito) {
        return res.status(404).json({ message: 'Distrito not found' });
    }
    res.json(distrito);
};

export const getEstaciones = async (_req, res) => {
    res.json(await estacionesService.getAll());
};

export const getEstacion = async (req, res) => {
    const estacion = await estacionesService.getById(req.params.id);
    if (!estacion) {
        return res.status(404).json({ message: 'Estacion not found' });
    }
    res.json(estacion);
};

export const getContenedores = async (_req, res) => {
    res.json(await contenedoresService.getAll());
};

export const getContenedor = async (req, res) => {
    const contenedor = await contenedoresService.getById(req.params.id);
    if (!contenedor) {
        return res.status(404).json({ message: 'Contenedor not found' });
    }
    res.json(contenedor);
};

export const getPuntosTransporte = async (_req, res) => {
    res.json(await puntosTransporteService.getAll());
};

export const getPuntoTransporte = async (req, res) => {
    const puntoTransporte = await puntosTransporteService.getById(req.params.id);
    if (!puntoTransporte) {
        return res.status(404).json({ message: 'Punto de transporte not found' });
    }
    res.json(puntoTransporte);
};
