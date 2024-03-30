import mongoose from 'mongoose';
const { models, model, Schema } = mongoose;

const DestinationSchema = new Schema({
  _id: { type: String },
  destinationId: {type:Number},
  destinationName: {type: String},
  truckId: { type: String, ref: 'Truck' },
  driverId: { type: String },
  latitude: { type: Number},
  longitude: { type: Number},
  source: {type: String},
  status: {type: String},
}, { timestamps: true });

export const Destination = models?.Destination || model('Destination',DestinationSchema);