import mongoose from 'mongoose';
const { Schema } = mongoose;

const metaSchema = new Schema({
    idelem : {type : Number},
    tipo_elem : {type : String},
}, {_id : false,})

const traficoRegistroSchema = new Schema({
    ts : {type : Date},
    meta : {type : metaSchema},
    vmed : {type : Number},
    intensidad : {type : Number},
    carga : {type : Number},
    error : {type : String},
    periodo_integracion : {type : Number},
    ocupacion : {type : Number},
}, {
    collection : 'trafico_15min',
    versionKey : false,
    autoCreate : false,
    autoIndex : false,

})

export default mongoose.model('TraficoRegistro', traficoRegistroSchema);