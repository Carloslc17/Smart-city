import { Router } from 'express';
import { getEstaciones, getEstacion } from '../controllers/recursos_controller.js';

const router = Router();

router.get('/', getEstaciones);
router.get('/:id', getEstacion);

export default router;
