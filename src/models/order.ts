import mongoose, { Document } from "mongoose";

export interface OrderItem {
  productName: string;
  productImage: string;
  unitPrice: number;
  quantity: number;
}

export interface IOrder extends Document {
  userId: mongoose.Types.ObjectId | string;
  items: OrderItem[];
  totalAmount: number;
  address: string;
  status: "pending" | "completed" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}

export const OrderSchema = new mongoose.Schema<IOrder>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },

  items: [
    {
      productName: { type: String, required: true },
      productImage: { type: String, required: true },
      unitPrice: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  ],

  totalAmount: {
    type: Number,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    enum: ["pending", "completed", "cancelled"],
    default: "pending",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const OrderModel = mongoose.model<IOrder>("order", OrderSchema);

export default OrderModel;