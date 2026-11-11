import AppError from '../../utils/AppError.js';

export function authorize(...roles) {
    return (req, _res, next) => {
        if (!req.user) {
            throw new AppError('Debes iniciar sesión para acceder a este recurso', 401);
        }

        if (!roles.includes(req.user.role)) {
            throw new AppError('No tienes permisos para acceder a este recurso', 403);
        }

        next();
    };
}
