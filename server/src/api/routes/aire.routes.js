import { Router } from 'express';
import { getCalidadAire } from '../controllers/datosUrbanos.controller.js';

const router = Router();

router.get('/', getCalidadAire);

export default router;
