import mongoose from 'mongoose';
const { models, model, Schema } = mongoose;

const DriverHealthSchema = new Schema({
  _id: { type: String },
  driverId: { type: String, ref: 'Driver' },
  heartRate: { type: Number },
  fatigueLevel: { type: Number },
  bodyTemp: { type: Number },
  hydrationLevel: { type: Number },
  stressLevel: { type: Number },
  healthStatus: { type: String },
}, { timestamps: true });

export const DriverHealth = models?.DriverHealth || model('DriverHealth', DriverHealthSchema);