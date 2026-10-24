import mongoose from 'mongoose';
const { Schema } = mongoose;

const edades = new Schema({
    edad : { type: Number },
    esp_h : { type: Number },
    esp_m : { type: Number },
    ext_h : { type: Number },
    ext_m : { type: Number },
}, {
    _id : false,
})

const censoSchema = new Schema({
    _id: { type: String, required: true},
    fecha_extraccion : { type: Date},
    distrito_cod : { type: Number},
    distrito : { type: String},
    barrio_cod : { type: Number},
    barrio : { type: String},
    seccion_cod : { type: Number},
    total : { type: Number},
    edades : { type : [edades]}

}, {
    collection : 'censo',
    versionKey : false,
    autoCreate : false,
    autoIndex : false,
})  

export default mongoose.model('Censo', censoSchema);
