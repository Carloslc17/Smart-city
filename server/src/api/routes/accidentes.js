import { Router } from 'express';
import { getAccidentes } from '../controllers/datos_urbanos_controller.js';

const router = Router();

router.get('/', getAccidentes);

export default router;
