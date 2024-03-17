import mongoose from 'mongoose';
const { models, model, Schema } = mongoose;

const TruckSchema = new Schema({
  truckNo: { type: String },
  driverId: { type: String },
  location: { type: String },
  incidents: { type: Number },
  status: { type: String },
  note: { type: String }
}, { timestamps: true });

export const Truck = models?.Truck || model('Truck', TruckSchema);

  