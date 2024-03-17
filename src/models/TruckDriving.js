import mongoose from 'mongoose';
const { models, model, Schema } = mongoose;

const TruckDrivingSchema = new Schema({
  truckId: { type: Schema.Types.ObjectId, ref: 'Truck' },
  destinationId: { type: Schema.Types.ObjectId, ref: 'Destination' },
  driverId: { type: Schema.Types.ObjectId, ref: 'Driver' },
  actualArrivalTime: { type: Date},
  eta: { type: Date },
  status: { type: String },
}, { timestamps: true });

export const TruckDriving = models?.TruckDriving || model('TruckDriving',TruckDrivingSchema);