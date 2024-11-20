import mongoose from 'mongoose';
const { models, model, Schema } = mongoose;

const BrakeSystemSchema = new Schema({
    truckId: { type: String, ref: 'Truck' },
    truckName: {type:String},
    padWear: { type: Number },
    fluidLevel: { type: Number },
    pressure: { type: Number },
    absStatus: { type: String },
}, { timestamps: true });

export const BrakeSystem = models?.BrakeHealth || model('BrakeSystem', BrakeSystemSchema);