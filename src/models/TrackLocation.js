import mongoose from 'mongoose';
const { models, model, Schema } = mongoose;

const TrackLocationSchema = new Schema({
  truckId: { type: Schema.Types.ObjectId, ref: 'Truck' },
  trailerId: { type: Schema.Types.ObjectId, ref: 'Trailer' },
  gps: { type: Boolean, default: true },
  strength: { type: String },
  locationStatus: { type: String },
  beacon: { type: Boolean }
}, { timestamps: true });

export const TrackLocation = models?.TrailerLocation || model('TrackLocation', TrackLocationSchema);
