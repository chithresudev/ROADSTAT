import mongoose from 'mongoose';
const { models, model, Schema } = mongoose;

const RoleSchema = new Schema({
  name: { type: String },
}, { timestamps: true });

export const Role = models?.Role || model('Role', RoleSchema);