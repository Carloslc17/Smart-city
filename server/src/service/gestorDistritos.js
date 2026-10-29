import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

export const getDistritos = async (req, res) => {
    try {
        const distritos = await mongoose.model('Distrito').find().sort({ _id: 1 }).lean();
        res.json(distritos);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving distritos', error });
    }
};

export const getDistrito = async (req, res) => {
    const { id } = req.params;
    try {
        const distrito = await mongoose.model('Distrito').findById(id).lean();
        if (!distrito) {
            return res.status(404).json({ message: 'Distrito not found' });
        }
        res.json(distrito);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving distrito', error });
    }
};

export default router;
