import mongoose from 'mongoose';
import PointSchema from './_point.js';
const { Schema } = mongoose;

const atributosSchema = new Schema.Types.Mixed({
    idelem : {type : Number},
    cod_cent : {type : String},
}, {
    _id : false,
})

const estacionSchema = new Schema({
    _id : {type : String},
    tipo : {type : String},
    nombre : {type : String},
    tipo_elem : {type : String},
    atributos : {type : atributosSchema},
    location : {type : PointSchema},
}, {
    collection : 'estaciones',
    versionKey : false,
    autoCreate : false,
    autoIndex : false,
})  

export default mongoose.model('Estacion', estacionSchema);