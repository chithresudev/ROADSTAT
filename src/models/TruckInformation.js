import mongoose from 'mongoose';
const { models, model, Schema } = mongoose;

const TruckInformationSchema = new Schema({
  _id: { type: String },
  truckId: { type: String, ref: 'Truck' },
  truckName: { type: String },
  distanceTravelled: { type: Number },
  location: { type: String },
  idleStartDate: { type: Date },
  idleStartTime: { type: String },
  idleEndDate: { type: Date },
  idleEndTime: { type: String },
  duration: { type: Number },
}, { timestamps: true });

TruckInformationSchema.set('toJSON', {
  transform: function (doc, ret) {
    if (ret.idleStartDate instanceof Date) {
      ret.idleStartDate = ret.idleStartDate.toISOString().split('T')[0];
    }
    if (ret.idleEndDate instanceof Date) {
      ret.idleEndDate = ret.idleEndDate.toISOString().split('T')[0];
    }
    return ret;
  }
});

export const TruckInformation = models?.TruckInformation || model('TruckInformation', TruckInformationSchema);