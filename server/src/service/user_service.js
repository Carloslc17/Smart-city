import User from '../models/User.js';
import AppError from '../utils/AppError.js';

// Buscar usuario por id
export const findById = (id) => User.findById(id);

// Buscar usuario por nombre de usuario
export const findByUsername = (username) => User.findOne({ username });

// Crear usuario. Validar existencia.
export const createUser = async (userData) => {
    try {
        const user = new User(userData);
        await user.save();
        return user;
    } catch (error) {
        if (error.code === 11000) {
            throw new AppError('El nombre de usuario o el email ya están registrados', 409);
        }
        if (error.name === 'ValidationError') {
            throw new AppError(error.message, 400);
        }
        throw error;
    }
};

// Comprobar existencia del email
export const existsByEmail = async (email) => Boolean(await User.exists({ email }));
