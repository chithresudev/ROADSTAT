import mongoose from 'mongoose';
const { models, model, Schema } = mongoose;


const TruckLocationSchema = new Schema({
  truckId: { type: Schema.Types.ObjectId, ref: 'Truck' },
  trailerId: { type: Schema.Types.ObjectId, ref: 'Trailer' },
  latitude: { type: Number },
  longitude: { type: Number },
  status: { type: String },
  gps: { type: Boolean, default: false },
  destination: { type: Schema.Types.ObjectId, ref: 'Destination' }
}, { timestamps: true });

export const TruckLocation = models?.TruckLocation || model('TruckLocation', TruckLocationSchema);