import mongoose from 'mongoose';
const { models, model, Schema } = mongoose;

const DriverSchema = new Schema({
  name: { type: String},
  age: { type: Number},
  experience: { type: Number},
  healthIssues: { type: String},
  accidentCount: { type: Number},
  status: { type: String},
}, { timestamps: true });

export const Driver = models?.Driver || model('Driver',DriverSchema);