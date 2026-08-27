import mongoose, { Schema, Document } from 'mongoose';
import { Product } from './product';


const CartStatus = ['pending', 'completed', 'cancelled'];

export interface cartItem
{
product: Product;
quantity: number;
unitPrice: number;

}

export interface Cart extends Document
{
    userId: mongoose.Types.ObjectId;
    items: cartItem[];
    totalAmount: number;
    status: "pending" | "completed" | "cancelled";
    createdAt: Date;
    updatedAt: Date;
}

const  cartItemSchema = new Schema<cartItem>({
    product: { type: Schema.Types.ObjectId, ref: 'product', required: true },
    quantity: { type: Number, required: true },
    unitPrice: { type: Number, required: true },
  });
  
  const cartSchema = new Schema<Cart>({
    userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    items: [cartItemSchema],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: CartStatus, default: 'pending' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });


  
  export const CartModel = mongoose.model<Cart>('cart', cartSchema);