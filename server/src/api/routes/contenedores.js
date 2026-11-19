import { Router } from 'express';
import { getContenedores, getContenedor } from '../controllers/recursos_controller.js';

const router = Router();

router.get('/', getContenedores);
router.get('/:id', getContenedor);

export default router;
