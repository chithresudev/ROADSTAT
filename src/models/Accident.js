import mongoose from 'mongoose';
const { models, model, Schema } = mongoose;

const AccidentSchema = new Schema({
  truckDrivingId: { type: Schema.Types.ObjectId, ref: 'TruckDriving' },
  incidentDate: { type: Date },
  location: { type: String },
  severity: { type: String },
  description: { type: String },
}, { timestamps: true });

export const Accident = models?.Accident || model('Accident',AccidentSchema);