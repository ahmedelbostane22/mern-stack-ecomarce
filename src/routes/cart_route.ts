import express from 'express';

import { addToCartRequest, CartServices , updateToCart , deleteToCart , ClearCart , checkout } from '../services/cart_services';
import validateJwt from '../middelwares/validate_jwt';
import { CustomRequest } from '../types/customRequest';


const router = express.Router();

router.get('/', validateJwt, async (req, res) => {
    const customReq = req as unknown as CustomRequest;


    if (!customReq.user) {
        res.status(401).send({
            success: false,
            message: "User not found in request"
        });
        return;
    }

    const userId = customReq.user._id.toString();

    const cart = await CartServices.getActiveCartForUser({
        userId
    });

    res.status(200).send(cart);
});


router.post("/items" , validateJwt, async (req, res) => {
    const customReq = req as unknown as CustomRequest;
    const { productId, quantity } = req.body;
    const userId = customReq.user._id.toString();
    const response = await addToCartRequest({ productId , quantity , userId });
    res.status(response.statuscode).send(response.data);
})

router.put("/items" , validateJwt, async (req, res)=>{
     const customReq = req as unknown as CustomRequest;
     const { productId, quantity } = req.body;
     const userId = customReq.user._id.toString();
     const response = await updateToCart({ productId , quantity , userId });
     res.status(response.statuscode).send(response.data);
})

router.delete("/items/:productId",validateJwt, async (req, res)=>{
    const customReq = req as unknown as CustomRequest;
    const productId = req.params.productId;
    const userId = customReq.user._id.toString();
    const response = await deleteToCart({ productId , userId });
    res.status(response.statuscode).send(response.data);
})

router.delete("/", validateJwt, async (req,res)=>{
    const customReq = req as unknown as CustomRequest;
    const userId = customReq.user._id.toString();
    const response =await ClearCart({ userId });
    return res.status(response.statuscode).send(response.data);
})

router.post("/checkout", validateJwt, async (req, res) => {
    try {
        const customReq = req as unknown as CustomRequest;

        const address = req.body.address;
        const userId = customReq.user._id.toString();

        const result = await checkout({
            userId,
            address
        });

        return res.status(result.statuscode).json({
            success: true,
            message: "Order created successfully",
            order: result.data
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Checkout failed"
        });
    }
});
export default router;