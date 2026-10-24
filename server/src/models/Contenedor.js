import mongoose from 'mongoose';
import PointSchema from './_point.js';
const { Schema } = mongoose;

const viaSchema = new Schema({
    tipo : {type : String},
    nombre : {type : String},
    numero : {type : String},
}, {
    _id : false
})

const contenedoresSchema = new Schema({
    tipo : {type : String},
    descripcion : {type : String},
    cantidad : {type : Number},
}, { _id : false })


const contenedorSchema = new Schema({
    _id : {type : String},
    lote : {type : Number},
    via : {type : viaSchema}, 
    contenedores : {type : [contenedoresSchema]},  
    distrito_cod : {type : Number},
    barrio_cod : {type : Number}, 
    location : {type : PointSchema},
}, {
    collection : 'contenedores',
    versionKey : false,
    autoCreate : false,
    autoIndex : false,
})

export default mongoose.model('Contenedor', contenedorSchema);
