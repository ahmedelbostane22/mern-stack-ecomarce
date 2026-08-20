import express from 'express';
import { ProductModel} from '../models/product';
const router = express.Router();


export const  getAllProducts = async () => {
    const products = await ProductModel.find();
    return products

}




export const  seedInitialData = async () => {
    const initialData = [
        { title: 'Product 1', image: 'image1.jpg', price: '9.99', stock: 10, description: 'Description 1' },
        { title: 'Product 2', image: 'image2.jpg', price: '19.99', stock: 5, description: 'Description 2' },
        { title: 'Product 3', image: 'image3.jpg', price: '29.99', stock: 3, description: 'Description 3' },
    ];

    const product = await getAllProducts();
    if (product.length === 0) {

    await ProductModel.insertMany(initialData);
    }
}





export const AddProduct = async (product: any) => {
    const newProduct = await ProductModel.create(product);
    return newProduct;
}

export const updateProduct = async (id: string, product: any) => {
    const updatedProduct = await ProductModel.findByIdAndUpdate(id, product, { new: true });
    return updatedProduct;
}

export const deleteProduct = async (id: string) => {
    const deletedProduct = await ProductModel.findByIdAndDelete(id);
    return deletedProduct;
}