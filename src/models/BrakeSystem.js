    import mongoose from 'mongoose';
    const { models, model, Schema } = mongoose;

    const BrakeSystemSchema = new Schema({
    truckNo: { type: String },
    truckName: { type: String },
    padWear: { type: Number },
    fluidLevel: { type: Number },
    pressure: { type: Number },
    absStatus: { type: String },
    }, { timestamps: true });

    export const BrakeSystem = models?.BrakeHealth || model('BrakeSystem', BrakeSystemSchema);
