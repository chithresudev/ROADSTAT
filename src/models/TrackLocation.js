import mongoose from 'mongoose';
const { models, model, Schema } = mongoose;

const TrackLocationSchema = new Schema({
  _id: { type: String },
  truckId: { type: String, ref: 'Truck' },
  trailerId: { type: String, ref: 'Trailer' },
  gps: { type: Boolean, default: true },
  strength: { type: String },
  locationStatus: { type: String },
  beacon: { type: Boolean },
  // destination: { type: String, ref: 'Destination' }
}, { timestamps: true });

export const TrackLocation = models?.TrackLocation || model('TrackLocation', TrackLocationSchema);
