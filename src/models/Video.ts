import mongoose, { Schema, Document, Model } from 'mongoose';

// 2. models/Video.js - Trái tim màn hình Feed (Nút #1, #14)
export interface IVideo extends Document {
  uploader_id: mongoose.Types.ObjectId;
  video_url: string;
  caption: string;
  products_linked: mongoose.Types.ObjectId[];
  music_name: string;
  stats: {
    likes: number;
    comments: number;
    shares: number;
  };
}

const VideoSchema: Schema<IVideo> = new Schema({
  uploader_id: { type: Schema.Types.ObjectId, ref: 'User', required: true }, 
  video_url: { type: String, required: true }, 
  caption: String, 
  products_linked: [{ type: Schema.Types.ObjectId, ref: 'Product' }], 
  music_name: String, 
  stats: {
    likes: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
    shares: { type: Number, default: 0 }
  }
}, { timestamps: true });

const Video: Model<IVideo> = mongoose.models.Video || mongoose.model<IVideo>('Video', VideoSchema);
export default Video;