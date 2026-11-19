import { Router } from 'express';
import { getTrafico } from '../controllers/datos_urbanos_controller.js';

const router = Router();

router.get('/', getTrafico);

export default router;
