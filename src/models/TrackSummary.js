import mongoose from 'mongoose';
const { models, model, Schema } = mongoose;

const TrackSummarySchema = new Schema({
    _id: { type: String },
    truckId: { type: String, ref: 'Truck' },
    driverId: { type: String, ref: 'Driver' },
    destinationId: { type: String, ref: 'Destination' },
    source: { type: String },
    status: { type: String },
  }, { timestamps: true });
  
  export const TrackSummary = models?.TrackSummary || model('TrackSummary', TrackSummarySchema);