import mongoose from 'mongoose';
const { Schema } = mongoose;

const barrioSchema = new Schema({
    cod: { type: Number },
    nombre: { type: String },
  }, { _id: false }
);


const distritoSchema = new Schema({
    _id: { type: Number, required: true},
    nombre: {type: String, required: true},
    barrios: {type : [barrioSchema]}

}, {
    collection : 'distritos',
    versionKey : false,
    autoCreate : false,
    autoIndex : false,
})

export default mongoose.model('Distrito', distritoSchema);