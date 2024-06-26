import mongoose from 'mongoose';
const { models, model, Schema } = mongoose;

const RoleSchema = new Schema({
  _id: { type: String },
  roleName: { type: String },
}, { timestamps: true });

export const Role = models?.Role || model('Role', RoleSchema);