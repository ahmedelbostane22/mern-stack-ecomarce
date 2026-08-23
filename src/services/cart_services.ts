
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


interface   GetActiveCartForUser{
    userId: string
}

const getActiveCartForUser = async ({ userId }: GetActiveCartForUser) => {
    try {
        let cart = await CartModel.findOne({
            userId,
            status: 'pending'
        });

        if (!cart) {
            cart = await CartModel.create({
                userId,
                totalAmount: 0,
                status: 'pending'
            });
        }

        return cart;

    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const CartServices = {
    createCart,
    getActiveCartForUser
};

interface addItemCartRequest {
    productId: any;
    quantity: number;
    userId: string;
}

export const addToCartRequest = async ({ productId, quantity, userId }: addItemCartRequest) => {

  const  cart = await getActiveCartForUser({ userId });
  const existsInCart = cart.items.find((item)=>item.product.toString()===productId);
  if(existsInCart){
    return {data :"Item already exists in cart", statuscode: 400};

  }
  const product = await ProductModel.findById(productId);
  if(!product){
    return {data :"Product not found", statuscode: 400};
  }
  if(product.stock<quantity){
    return {data :"Product out of stock", statuscode: 400};
  }
  cart.items.push({
    product: productId,
    quantity,
    unitPrice: product.price 
  });
  cart.totalAmount += product.price * quantity;
  await cart.save();
  return {
    data: cart,
    statuscode: 200
  }
 



}
  interface updateToCartRequest {
    productId: any;
    quantity: number;
    userId: string;
  }
  export const updateToCart = async ({ productId, quantity, userId }: updateToCartRequest) => {
  const cart = await getActiveCartForUser({ userId });
  const existsInCart = cart.items.find((item)=>item.product.toString()===productId);
  if(!existsInCart){
    return {data :"Item not found in cart", statuscode: 400};
  }  
 const  product = await ProductModel.findById(productId);
  if(!product){
    return {data :"Product not found", statuscode: 400};
  }
  if(product.stock<quantity){
    return {data :"Product out of stock", statuscode: 400};
  }
  let sum = 0;
  existsInCart.quantity = quantity;
 const  otherItem = cart.items.filter((item)=>item.product.toString() !== productId);
  let total = otherItem.reduce((acc , item)=> {
     sum += item.unitPrice * item.quantity;
     return sum; 
  }, 0);
  total += existsInCart.unitPrice * quantity;
  cart.totalAmount = total;
  await cart.save();
  return {
    data: cart,
    statuscode: 200
  }
  

}

interface deleteToCartRequest {
    productId: any;
    userId: string;
  }

export const deleteToCart = async ({ productId , userId  }: deleteToCartRequest)=>{
    const cart = await getActiveCartForUser({userId});
   const existsInCart = cart.items.find((item)=>item.product.toString()===productId);
   if(!existsInCart){
    return {data :"Item not found in cart", statuscode: 400};
   }

  const otherItem = cart.items.filter((item)=>item.product.toString() ! == productId);
  cart.totalAmount -= existsInCart.unitPrice * existsInCart.quantity;
  cart.items = otherItem;
  await cart.save();
  return {
    data: cart,
    statuscode: 200
  }



}

const calculateTotalAmount = (items: cartItem[]): number => {
    return items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  };

  interface clearCartRequest {
    userId: string,
  }


 export const ClearCart = async({userId}:clearCartRequest) =>{
   const cart = await getActiveCartForUser({userId});
   cart.items = [];
   cart.totalAmount = 0;
   await cart.save();
   return {
    data: cart,
    statuscode: 200
  }

  }