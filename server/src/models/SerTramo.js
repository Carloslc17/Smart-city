import mongoose from 'mongoose';
import PointSchema from './_point.js';
const { Schema } = mongoose;

const serTramoSchema = new Schema({
    distrito : {type : String},
    distrito_cod : {type : Number},
    barrio :  {type : String},
    barrio_cod : {type : Number},
    finca : {type : String},
    color : {type : String},
    uso : {type : String},
    disposicion : {type : String},
    plazas : {type : Number},
    location : {type : PointSchema}
}, {
    collection : 'ser_tramos',
    versionKey : false,
    autoCreate : false,
    autoIndex : false,
})  

export default mongoose.model('SerTramo', serTramoSchema);