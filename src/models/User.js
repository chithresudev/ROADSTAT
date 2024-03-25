import mongoose from 'mongoose';
const { models, model, Schema } = mongoose;

const UserSchema = new Schema({
  _id: { type: String },
  username: { type: String },
  email: { type: String },
  password: { type: String },
  role: { type: String, ref: 'Role' },
}, { timestamps: true });

export const User = models?.User || model('User', UserSchema);