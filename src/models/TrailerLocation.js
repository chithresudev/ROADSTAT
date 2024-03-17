import mongoose from 'mongoose';
const { models, model, Schema } = mongoose;

const TrailerLocationSchema = new Schema({
  truckId: { type: Schema.Types.ObjectId, ref: 'Truck' },
  trailerId: { type: Schema.Types.ObjectId, ref: 'Trailer' },
  latitude: { type: Number },
  longitude: { type: Number },
  status: { type: String },
  gps: { type: Boolean, default: false },
}, { timestamps: true });

export const TrailerLocation = models?.TrailerLocation || model('TrailerLocation', TrailerLocationSchema);