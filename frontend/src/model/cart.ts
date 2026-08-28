import type { Product } from "./product";

interface cartItem {
    product: Product;
    quantity: number;
    unitPrice: number;
}

export interface Cart {
    userId: string;
    items: cartItem[];
    totalAmount: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}
