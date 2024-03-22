import mongoose from 'mongoose';
const { models, model, Schema } = mongoose;

const DestinationSchema = new Schema({
  _id: { type: String },
  destinationName: { type: String },
  latitude: { type: Number},
  longitude: { type: Number},
}, { timestamps: true });

export const Destination = models?.Destination || model('Destination',DestinationSchema);