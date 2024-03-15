import mongoose from 'mongoose';
const { models, model, Schema } = mongoose;

const AlertSchema = new Schema({
    truckId: { type: Schema.Types.ObjectId, ref: 'Truck' },
    metric: String,
    value: Number,
    message: String
  }, { timestamps: true });
  
  export const Alert = models?.Alert || model('Alert',AlertSchema);