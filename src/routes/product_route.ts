import express from 'express';
import { getAllProducts } from '../services/product_services';
import { AddProduct } from '../services/product_services';
import { updateProduct } from '../services/product_services';
import { deleteProduct } from '../services/product_services';
const router = express.Router();

router.get('/', async (req, res) => {
    const products = await getAllProducts();
    res.status(200).send(products);
})

// add product
router.post('/', async (req, res) => {
    try {
        const product = req.body;
        const newProduct = await AddProduct(product);
        res.status(201).send(newProduct);
    } catch (error: any) {
        res.status(400).send(error.message);
    }

    
})

// update product
router.put('/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const product = req.body;
        const updatedProduct = await updateProduct(productId, product);
        res.status(200).send(updatedProduct);

    }catch (error: any) {
        res.status(400).send(error.message);

    }
})


// delete product
router.delete('/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const deletedProduct = await deleteProduct(productId);
        res.status(200).send(
            {
                message: 'Product deleted successfully',
                
            }
        );
    } catch (error: any) {
        res.status(400).send(error.message);
    }
})


export default router