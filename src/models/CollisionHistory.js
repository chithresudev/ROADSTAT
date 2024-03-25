import mongoose from 'mongoose';
const { models, model, Schema } = mongoose;

const CollisionHistorySchema = new Schema({
  _id: { type: String },
  truckId: { type: String, ref: 'Truck' },
  date: { type: Date },
  driverName: { type: String },
  time: { type: String },
  location: { type: String },
  speedMPH: { type: Number },
  brakingMS2: { type: Number },
  collisionType: { type: String },
  severity: { type: String },
  description: { type: String },
}, { timestamps: true });

// Ensure dates are formatted before returning them

CollisionHistorySchema.set('toJSON', {
  transform: function (doc, ret) {
    if (ret.date instanceof Date) {
      ret.date = ret.date.toISOString().split('T')[0];
    }
    return ret;
  }
});

export const CollisionHistory = models?.CollisionHistory || model('CollisionHistory', CollisionHistorySchema);
