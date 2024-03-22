import mongoose from 'mongoose';
const { models, model, Schema } = mongoose;

const TrailerLocationSchema = new Schema({
  _id: { type: String },
  truckId: { type: String, ref: 'Truck' },
  trailerId: { type: String, ref: 'Trailer' },
  latitude: { type: Number },
  longitude: { type: Number },
  status: { type: String },
  gps: { type: Boolean, default: true },
}, { timestamps: true });

export const TrailerLocation = models?.TrailerLocation || model('TrailerLocation', TrailerLocationSchema);