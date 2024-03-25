import mongoose from 'mongoose';
const { models, model, Schema } = mongoose;


const TruckLocationSchema = new Schema({
  _id: { type: String },
  truckId: { type: String, ref: 'Truck' },
  trailerId: { type: String, ref: 'Trailer' },
  latitude: { type: Number },
  longitude: { type: Number },
  status: { type: String },
  gps: { type: Boolean, default: true },
  destinationId: { type: String, ref: 'Destination' }
}, { timestamps: true });

export const TruckLocation = models?.TruckLocation || model('TruckLocation', TruckLocationSchema);