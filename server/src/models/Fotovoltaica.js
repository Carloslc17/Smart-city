import mongoose from 'mongoose';
import PointSchema from './_point.js';
const { Schema } = mongoose;

const fotovoltaicaSchema = new Schema({
    _id : {type : String},
    centro : {type : String},
    direccion : {type : String},
    uso_edificio : {type : String},
    adscripcion : {type : String},
    distrito : {type : String},
    distrito_cod : {type : Number},
    potencia_kwp : {type : Number},
    empresa_instaladora : {type : String},
    puesta_servicio : {type : Date},
    location : {type : PointSchema},
}, {
    collection: 'fotovoltaicas',
    versionKey : false,
    autoCreate : false,
    autoIndex : false,

})

export default mongoose.model('Fotovoltaica', fotovoltaicaSchema);