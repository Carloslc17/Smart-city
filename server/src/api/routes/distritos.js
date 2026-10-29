import { Router } from 'express';
import Distrito from '../../models/Distrito.js';
import { getDistritos, getDistrito } from '../../service/gestorDistritos.js';

const router = Router();

router.get('/', getDistritos);
router.get('/:id', getDistrito);

export default router;
