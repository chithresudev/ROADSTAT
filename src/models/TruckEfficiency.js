import mongoose from 'mongoose';
const { models, model, Schema } = mongoose;

const TruckEfficiencySchema = new Schema({
  truckNo: { type: Schema.Types.ObjectId, ref: 'Truck' },
  serviceHistory: { type: String },
  level: { type: Number },
  status: { type: String },
}, { timestamps: true });

export const TruckEfficiency = models?.TruckEfficiency || model('TruckEfficiency', TruckEfficiencySchema);
