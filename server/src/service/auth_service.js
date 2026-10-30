import AppError from '../utils/AppError.js';
import { signToken, verifyToken } from '../utils/token.js';
import * as userService from './user_service.js';

// Validar credenciales. Comprobar formato correcto de usuario y contrasena.
function validateCredentials(credentials, includeEmail = false) {
    if (!credentials || typeof credentials !== 'object' || Array.isArray(credentials)) {
        throw new AppError('Debes enviar los datos de autenticacion', 400);
    }

    const { username, email, password } = credentials;
    if (
        typeof username !== 'string' ||
        !username.trim() ||
        typeof password !== 'string' ||
        !password
    ) {
        throw new AppError('Debes indicar un nombre de usuario y una contrasena', 400);
    }

    if (includeEmail && (typeof email !== 'string' || !email.trim())) {
        throw new AppError('Debes indicar un email valido', 400);
    }
}

// Registrar usuario
export async function register(credentials = {}) {
    validateCredentials(credentials, true);
    let { username, email, password } = credentials;
    username = username.trim();
    email = email.trim().toLowerCase();

    if (await userService.findByUsername(username)) {
        throw new AppError("El nombre de usuario ya está registrado", 409);
    }
    if (await userService.existsByEmail(email)) {
        throw new AppError("El email ya está registrado", 409);
    }

    const user = await userService.createUser({
        username: username,
        email: email,
        password,
    });
    const token = signToken(user);
    return { user, token };
}

// Iniciar sesion
export async function login(credentials = {}) {
    validateCredentials(credentials);
    const { username, password } = credentials;
    username = username.trim();
    const user = await userService.findByUsername(username);
    if (!user || !(await user.comparePassword(password))) {
        throw new AppError('Nombre de usuario o contrasena incorrectos', 401);
    }
    const token = signToken(user);
    return { user, token };
}

// Verificar token
export async function verify(token) {
    let decoded;
    try {
        decoded = verifyToken(token);
    } catch {
        throw new AppError('Token invalido o caducado', 401);
    }

    const user = await userService.findById(decoded.sub);
    if (!user) {
        throw new AppError('La sesión ya no es valida', 401);
    }
    return user;
}
