import mongoose from 'mongoose';
const { Schema } = mongoose;

const metaSchema = new Schema({
    estacion_id : {type : String},
    modo : {type : String},
})

const aforoRegistroSchema = new Schema({
    ts : {type : Date},
    meta : {type : metaSchema},
    conteo : {type : Number},
}, {
    collection : 'aforos_15min',
    versionKey : false,
    autoCreate : false,
    autoIndex : false,

})

export default mongoose.model('AforoRegistro', aforoRegistroSchema);