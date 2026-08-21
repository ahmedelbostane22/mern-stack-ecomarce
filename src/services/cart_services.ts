
import { cartItem } from "../models/cart";
import { CartModel } from "../models/cart";
import { ProductModel } from "../models/product";
import express from 'express';

interface CreateCartForUser{
    userId: string
}


const createCart = async ({userId}: CreateCartForUser) =>{

    try{
        const cart = await CartModel.create({ userId ,totalAmount: 0, status: 'pending' });
        await cart.save();
        return cart
    }catch(err){
        console.log(err)
    }

}


interface GetActiveCartForUser{
    userId: string
}

const getActiveCartForUser = async ({userId}: GetActiveCartForUser) =>{

    try{
        const cart = await CartModel.findOne({ userId, status: 'pending' });
        return cart
    }catch(err){
        console.log(err)
    }
}

export const CartServices = {
    createCart,
    getActiveCartForUser
}