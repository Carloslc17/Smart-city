import { Router } from 'express';
import { getAccidentes } from '../controllers/datosUrbanos.controller.js';

const router = Router();

router.get('/', getAccidentes);

export default router;
