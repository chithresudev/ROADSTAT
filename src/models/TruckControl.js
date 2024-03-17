import mongoose from 'mongoose';
const { models, model, Schema } = mongoose;

const TruckControlSchema = new Schema({
  truckId: { type: Schema.Types.ObjectId, ref: 'Truck' },
  status: { type: String },
  speed: { type: Number },
  fuelLevel: { type: Number },
  fuelPressure: { type: Number },
  engineTemp: { type: Number },
  COLevel: { type: Number },
  NOXLevel: { type: Number },
  HCLevel: { type: Number },
  tirePressure: { type: Number },
  brakeHealth: { type: String },
  batteryHealth: { type: String },
}, { timestamps: true });

export const TruckControl = models?.TruckControl || model('TruckControl',TruckControlSchema);