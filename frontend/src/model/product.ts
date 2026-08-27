export interface Product extends Document {
   id: number;
   title: string;
   image: string;
   price: number;
   stock: number;
   description: string;
   createdAt: Date;
   updatedAt: Date;
 }