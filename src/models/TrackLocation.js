import mongoose from 'mongoose';
const { models, model, Schema } = mongoose;

const TrackLocationSchema = new Schema({
  sNo: { type: Number },
  truckNo: { type: String },
  trailerNo: { type: String },
  gps: { type: Boolean, default: false },
  strength: { type: String },
  locationStatus: { type: String },
  beacon: { type: Boolean }
}, { timestamps: true });

export const TrackLocation = models?.TrailerLocation || model('TrackLocation', TrackLocationSchema);
