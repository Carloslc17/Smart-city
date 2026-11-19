import { Router } from 'express';
import { getCurrentUser, login, logout, register } from '../controllers/auth_controller.js';
import { requireAuth } from '../middlewares/auth.js';

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.post('/logout', logout);
router.get('/me', requireAuth, getCurrentUser);

export default router;