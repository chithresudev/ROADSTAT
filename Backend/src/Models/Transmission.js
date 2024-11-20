import mongoose from 'mongoose';
const { models, model, Schema } = mongoose;

const TransmissionSchema = new Schema({
    truckId: { type: String, ref: 'Truck' },
    COlevel: { type: Number },
    NOXlevel: { type: Number },
    HClevel: { type: Number },
    status: { type: String },
}, { timestamps: true });

export const Transmission = models?.Transmission || model('Transmission', TransmissionSchema);