import mongoose from 'mongoose';
const { models, model, Schema } = mongoose;

const BrakeSystemSchema = new Schema({
    _id: { type: String },
    truckId: { type: String, ref: 'Truck' },
    padWear: { type: Number },
    fluidLevel: { type: Number },
    pressure: { type: Number },
    absStatus: { type: String },
}, { timestamps: true });

export const BrakeSystem = models?.BrakeHealth || model('BrakeSystem', BrakeSystemSchema);
