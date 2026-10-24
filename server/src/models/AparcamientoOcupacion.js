import mongoose from 'mongoose';
const { Schema } = mongoose;

const mesSchema = new Schema({
    mes : {type : Number},
    dias_calculo : {type : Number},
    vehiculos_dia : {type : Number},
    ocupacion_pct : {type : Number},
    ocupacion_9_21_pct : {type : Number},
}, { _id : false, })

const aparcamientoSchema = new Schema({
    _id : {type : String},
    nombre : {type : String},
    anio : {type : Number},
    meses : [mesSchema],
}, {
    collection : 'aparcamientos_ocupacion',
    versionKey : false,
    autoCreate : false,
    autoIndex : false,
})

export default mongoose.model('AparcamientoOcupacion', aparcamientoSchema);