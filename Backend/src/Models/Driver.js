import mongoose from 'mongoose';
const { models, model, Schema } = mongoose;

const DriverSchema = new Schema({
  _id: { type: String },
  driverId: {type:String},
  driverName: { type: String },
  knownHealthIssues: { type: String },
  experience: { type: Number },
  status: { type: String },
}, { timestamps: true });

export const Driver = models?.Driver || model('Driver', DriverSchema);