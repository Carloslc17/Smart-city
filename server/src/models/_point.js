import mongoose from 'mongoose';

const PointSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["Point"], required: true },
    coordinates: { type: [Number], required: true }, // [lon, lat]
  },
  { _id: false }
);

export default PointSchema;