import { Router } from 'express';
import { getPuntosTransporte, getPuntoTransporte } from '../controllers/recursos.controller.js';

const router = Router();

router.get('/', getPuntosTransporte);
router.get('/:id', getPuntoTransporte);

export default router;
