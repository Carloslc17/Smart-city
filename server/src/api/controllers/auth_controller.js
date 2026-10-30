import * as authService from '../../service/auth_service.js';

function publicUser(user) {
    return {
        id: user._id.toString(),
        username: user.username,
        email: user.email,
        role: user.role,
    };
}

export const register = async (req, res) => {
    const { user, token } = await authService.register(req.body);
    res.status(201).json({
        message: 'Usuario registrado correctamente',
        user: publicUser(user),
        token,
    });
};

export const login = async (req, res) => {
    const { user, token } = await authService.login(req.body);
    res.status(200).json({
        message: 'Inicio de sesión correcto',
        user: publicUser(user),
        token,
    });
};

export const logout = (_req, res) => {
    res.status(200).json({
        message: 'Sesión cerrada. Elimina el token almacenado en el cliente.',
    });
};

export const getCurrentUser = (req, res) => {
    res.status(200).json({ user: publicUser(req.user) });
};
