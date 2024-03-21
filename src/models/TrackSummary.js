import mongoose from 'mongoose';
const { models, model, Schema } = mongoose;

const TrackSummarySchema = new Schema({
    source: { type: Schema.Types.ObjectId, ref: 'TrackLocation' },
    truckId: { type: Schema.Types.ObjectId, ref: 'Truck' },
    driverId: { type: Schema.Types.ObjectId, ref: 'Driver' },
    destinationId: { type: Schema.Types.ObjectId, ref: 'Destination' },
    status: { type: String },
  }, { timestamps: true });
  
  export const TrackSummary = models?.TrackSummary || model('TrackSummary', TrackSummarySchema);