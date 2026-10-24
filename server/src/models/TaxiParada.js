import mongoose from 'mongoose';
import PointSchema from './_point.js';
const { Schema } = mongoose;

const taxiParadaSchema = new Schema({
    numero : {type : String},
    fecha_alta : {type : Date},
    distrito : {type : String},
    distrito_cod : {type : Number},
    barrio : {type : String},
    barrio_cod : {type : Number},
    calle : {type : String},
    finca : {type : String},
    tipo_reserva : {type : String},
    plazas : {type : Number},
    texto_cajetin : {type : String},
    location : {type : PointSchema}
}, {
    collection : 'taxi_paradas',
    versionKey : false,
    autoCreate : false,
    autoIndex : false,
})  

export default mongoose.model('TaxiParada', taxiParadaSchema);