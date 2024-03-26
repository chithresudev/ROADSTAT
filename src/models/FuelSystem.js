import mongoose from 'mongoose';
const { models, model, Schema } = mongoose;

const FuelSystemSchema = new Schema({
    _id: { type: String },
    truckId: { type: String, ref: 'Truck' },
    truckName: {type: String },
    fuelLevel: { type: Number },
    fuelConsumptionRate: { type: Number },
    fuelEfficiency: { type: Number },
}, { timestamps: true });

export const FuelSystem = models?.FuelHealth || model('FuelSystem', FuelSystemSchema);