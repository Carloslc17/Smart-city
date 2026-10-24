import mongoose from 'mongoose';
const { Schema } = mongoose;

const multaSchema = new Schema({
    fecha_denuncia : { type: Date },
    hora : { type: String },
    calificacion : { type: String },
    lugar : { type: String },
    importe_boletin : { type: Number },
    descuento : { type : Boolean },
    puntos : { type : Number },
    denunciante : { type : String },
    hecho : { type : String },
    num_boletines : { type : Number },
    importe_agrupado : { type : Number },
}, {
    collection : 'multas',
    versionKey : false,
    autoCreate : false,
    autoIndex : false,
}) 

export default mongoose.model('Multa', multaSchema);
