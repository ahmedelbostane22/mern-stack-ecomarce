import mongoose, { Schema, Document } from 'mongoose';


export interface Product extends Document {
    title: string;
    image: string;
    price: number;
    stock: number;
    description: string;
    // category: string;
    createdAt: Date;
    updatedAt: Date;
  }

  const productSchema: Schema<Product> = new Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    description: { type: String, required: true },
    // category: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });

  export const ProductModel = mongoose.model<Product>('product', productSchema);