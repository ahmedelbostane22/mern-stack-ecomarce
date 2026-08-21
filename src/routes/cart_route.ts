import express, { Request } from 'express';

import { CartServices } from '../services/cart_services';
import validateJwt from '../middelwares/validate_jwt';

interface CustomRequest extends Request {
    user?: any;
}

const router = express.Router();

router.get('/', validateJwt, async (req: CustomRequest, res) => {

    if (!req.user) {
        res.status(401).send({
            success: false,
            message: "User not found in request"
        });
        return;
    }

    const userId = req.user._id.toString();

    const cart = await CartServices.getActiveCartForUser({
        userId
    });

    res.status(200).send(cart);
});

export default router;