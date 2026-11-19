import AppError from '../../utils/AppError.js';
import * as authService from '../../service/auth_service.js';

export async function requireAuth(req, _res, next) {
    const authorization = req.get('authorization');
    const match = authorization?.match(/^Bearer\s+(\S+)$/i);

    if (!match) {
        throw new AppError('Debes iniciar sesión para acceder a este recurso', 401);
    }

    req.user = await authService.verify(match[1]);
    next();
}