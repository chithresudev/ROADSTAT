import mongoose from 'mongoose';
const { models, model, Schema } = mongoose;

const AlertSchema = new Schema({
    truckId: { type: String, ref: 'Truck' },
    metric: String,
    value: Number,
    message: String
  }, { timestamps: true });
  
  export const Alert = models?.Alert || model('Alert',AlertSchema);

  AlertSchema.set('toJSON', {
    transform: function (doc, ret) {
        ret.createdAt = new Date(ret.createdAt).toLocaleString();
        ret.updatedAt = new Date(ret.updatedAt).toLocaleString();
        return ret;
    }
});