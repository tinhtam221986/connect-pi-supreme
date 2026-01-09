import mongoose, { Schema, Document, Model } from 'mongoose';

// 1. models/User.js - Quản lý định danh (Nút #13, #15)
export interface IUser extends Document {
  username: string;
  pi_wallet: string;
  avatar: string;
  is_seller: boolean;
  follower_count: number;
}

const UserSchema: Schema<IUser> = new Schema({
  username: { type: String, required: true, unique: true },
  pi_wallet: { type: String, required: true }, 
  avatar: String, 
  is_seller: { type: Boolean, default: false }, 
  follower_count: { type: Number, default: 0 } 
}, { timestamps: true });

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export default User;