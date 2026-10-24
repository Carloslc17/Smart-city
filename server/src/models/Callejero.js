import mongoose from 'mongoose';
import PointSchema from './_point.js';
const { Schema } = mongoose;

const callejeroSchema = new Schema({
    cod_num : {type : String},
    cod_via : {type : String},
    clase_via : {type : String},
    nombre_via : {type : String},
    literal_num : {type : String},
    distrito_cod : {type : Number},
    distrito : {type : String},
    barrio_cod : {type : Number},
    barrio : {type : String},
    seccion_censal : {type : String},
    cp : {type : String},
    zona_ser : {type : String},
    categoria_fiscal : {type : String},
    direccion : {type : String},
    location : {type : PointSchema}
}, {
    collection : 'callejero',
    versionKey : false,
    autoCreate : false,
    autoIndex : false,
})

export default mongoose.model('Callejero', callejeroSchema);
