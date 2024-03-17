import mongoose from 'mongoose';
const { models, model, Schema } = mongoose;

const TruckSchema = new Schema({
  length: { type: Number },
  width: { type: Number },
  height: { type: Number },
  weight: { type: Number},
  capacity: { type: Number},
  engineType: { type: String},
  horsePower: { type: Number},
  transmission: { type: String }, //automatica or manual
  condition: { type: String }, //new, used, refurbished
  manufacturer: { type: String},
  model: { type: String},
  manufacturedYear: { type: Number},
}, { timestamps: true });

export const Truck = models?.Truck || model('Truck',TruckSchema);