import mongoose from 'mongoose';
const { Schema } = mongoose;

const aparcamientoSchema = new Schema({
    _id : {type : String},
    nombre : {type : String},
    tipo : {type : String},
    plazas : {type : Number},
    distrito_cod : {type : Number},
    distrito : {type : String},
}, {
    collection : 'aparcamientos',
    versionKey : false,
    autoCreate : false,
    autoIndex : false,
})

export default mongoose.model('Aparcamiento', aparcamientoSchema);