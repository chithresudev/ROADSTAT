import mongoose from 'mongoose';
const { models, model, Schema } = mongoose;

const TrailerSchema = new Schema({
  _id: { type: String },
  length: { type: Number },
  width: { type: Number },
  height: { type: Number },
  weight: { type: Number},
  capacity: { type: Number},
  condition: { type: String }, //new, used, refurbished
  manufacturer: { type: String},
  model: { type: String},
  manufacturedYear: { type: Number},
}, { timestamps: true });

export const Trailer = models?.Trailer || model('Trailer',TrailerSchema);