import mongoose from 'mongoose';
const { models, model, Schema } = mongoose;

const FuelSystemSchema = new Schema({
    truckNo: { type: String },
    truckName: { type: String },
    fuelLevel: { type: Number },
    fuelConsumptionRate: { type: Number },
    fuelEfficiency: { type: Number },
}, { timestamps: true });

export const FuelSystem = models?.FuelHealth || model('FuelSystem', FuelSystemSchema);
