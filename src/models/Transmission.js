import mongoose from 'mongoose';
const { models, model, Schema } = mongoose;

const TransmissionSchema = new Schema({
    truckNo: { type: String },
    RPM: { type: Number },
    engineTemperature: { type: Number },
    oilPressure: { type: Number },
    coolantTemperature: { type: Number },
    status: { type: String },
}, { timestamps: true });

export const Transmission = models?.Transmission || model('Transmission', TransmissionSchema);
