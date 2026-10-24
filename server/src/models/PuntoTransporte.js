import mongoose from 'mongoose';
import PointSchema from './_point.js';
const { Schema } = mongoose;

const PuntoTransporteSchema = new Schema({
    _id : {type : String},
    modo : {type : String},
    nombre : {type : String},
    descripcion : {type : String},
    location : {type : PointSchema},
}, {
    collection : 'puntos_transporte',
    versionKey : false,
    autoCreate : false,
    autoIndex : false,
})

export default mongoose.model('PuntoTransporte', PuntoTransporteSchema);
