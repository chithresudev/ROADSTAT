import mongoose from 'mongoose';
const { models, model, Schema } = mongoose;

const EngineHealthSchema = new Schema({
  truckId: { type: String, ref: 'Truck' },
  RPM: { type: Number },
  engineTemperature: { type: Number },
  oilPressure: { type: Number },
  coolantTemperature: { type: Number },
  status: { type: String },
}, { timestamps: true });

export const EngineHealth = models?.EngineHealth || model('EngineHealth', EngineHealthSchema);
