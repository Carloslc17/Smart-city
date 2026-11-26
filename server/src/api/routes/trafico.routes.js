import { Router } from 'express';
import { getTrafico } from '../controllers/datosUrbanos.controller.js';

const router = Router();

router.get('/', getTrafico);

export default router;
