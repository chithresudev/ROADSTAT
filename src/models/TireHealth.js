import mongoose from 'mongoose';
const { models, model, Schema } = mongoose;

const TireHealthSchema = new Schema({
    truckNo: { type: String },
    truckName: { type: String },
    tirePressure: { type: Number },
    temperature: { type: Number },
    tireDepth: { type: Number },
    tireAge: { type: Number },
}, { timestamps: true });

export const TireHealth = models?.TireHealth || model('TireHealth', TireHealthSchema);
