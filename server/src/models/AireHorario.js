import mongoose from 'mongoose';
const { Schema } = mongoose;

const metaSchema = new Schema({
    estacion_id : {type : String},
    magnitud : {type : String},
    magnitud_cod : {type : Number},
    tecnica : {type : String},
}, {
    _id : false,
})

const aireHorarioSchema = new Schema({
    ts : {type : Date},
    meta : {type : metaSchema},
    valor : {type : Number},
}, {
    collection : 'aire_horario',
    versionKey : false,
    autoCreate : false,
    autoIndex : false,

})

export default mongoose.model('AireHorario', aireHorarioSchema);
