import mongoose from 'mongoose';
import PointSchema from './_point.js';
const { Schema } = mongoose;

const afectadoSchema = new Schema({
    tipo_persona : { type: String },
    tipo_vehiculo : { type: String },
    sexo : { type: String },
    lesividad : { type: String },
}, {
    _id : false,
})

const accidenteSchema = new Schema({
    _id : { type: String, required: true},
    fecha : { type: Date, required: true},
    franja_hora : { type : Number},
    calle : { type : String },
    numero : { type : String },
    distrito : { type : String },
    distrito_cod : { type : Number },
    tipo_accidente : { type : String },
    estado_meteorologico : { type : String },
    n_afectados : { type : Number },
    gravedad_max : { type : String },
    location : { type : PointSchema, required: true },
    afectados : { type : [afectadoSchema] }
}, {
    collection : 'accidentes',
    versionKey : false,
    autoCreate : false,
    autoIndex : false,
})  

export default mongoose.model('Accidente', accidenteSchema);
