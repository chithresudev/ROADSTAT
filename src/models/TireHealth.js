import mongoose from 'mongoose';
const { models, model, Schema } = mongoose;

const TireHealthSchema = new Schema({
    _id: { type: String },
    truckId: { type: String, ref: 'Truck' },
    truckName: {type: String},
    tirePressure: { type: Number },
    tireTemperature: { type: Number },
    tireDepth: { type: Number },
    tireAge: { type: Number },
}, { timestamps: true });

export const TireHealth = models?.TireHealth || model('TireHealth', TireHealthSchema);