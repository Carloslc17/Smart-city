import { Router } from 'express';
import { getCalidadAire } from '../controllers/datos_urbanos_controller.js';

const router = Router();

router.get('/', getCalidadAire);

export default router;
