import mongoose from 'mongoose';
const { models, model, Schema } = mongoose;

const UserSchema = new Schema({
  username: { type: String },
  email: { type: String },
  password: { type: String },
  role: { type: String },
}, { timestamps: true });

export const User = models?.User || model('User',UserSchema);