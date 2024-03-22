import mongoose from 'mongoose';
const { models, model, Schema } = mongoose;

const TruckEfficiencySchema = new Schema({
  _id: { type: String },
  truckId: { type: String, ref: 'Truck' },
  serviceHistory: { type: String },
  level: { type: Number },
  status: { type: String },
}, { timestamps: true });

export const TruckEfficiency = models?.TruckEfficiency || model('TruckEfficiency', TruckEfficiencySchema);
