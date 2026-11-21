import { Router } from 'express';
import { getDistritos, getDistrito } from '../controllers/recursos.controller.js';

const router = Router();

router.get('/', getDistritos);
router.get('/:id', getDistrito);

export default router;
