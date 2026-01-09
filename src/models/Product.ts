import mongoose, { Schema, Document, Model } from 'mongoose';

// 3. models/Product.js - Quản lý kho hàng (Nút #14)
export interface IProduct extends Document {
  seller_id: mongoose.Types.ObjectId;
  name: string;
  price_pi: number;
  in_stock: boolean;
}

const ProductSchema: Schema<IProduct> = new Schema({
  seller_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  price_pi: { type: Number, required: true },
  in_stock: { type: Boolean, default: true } 
}, { timestamps: true });

const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
export default Product;