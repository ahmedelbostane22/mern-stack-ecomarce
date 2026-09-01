
export interface cartItem {
    productId: string;
    title: string;
    quantity: number;
    unitPrice: number;
    image: string;

}

export interface Cart {
    userId: string;
    items: cartItem[];
    totalAmount: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}
