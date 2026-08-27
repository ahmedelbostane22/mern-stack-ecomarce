
import { cartItem } from "../models/cart";
import { CartModel } from "../models/cart";
import OrderModel, { OrderItem,  } from "../models/order";
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
    try {
      const cart = await getActiveCartForUser({ userId });
      const existsInCart = cart.items.find((item) => item.product.toString() === productId);

      if (!existsInCart) {
        return { data: "Item not found in cart", statuscode: 400 };
      }

      const product = await ProductModel.findById(productId);
      if (!product) {
        return { data: "Product not found", statuscode: 400 };
      }

      if (product.stock < quantity) {
        return { data: "Product out of stock", statuscode: 400 };
      }

      let sum = 0;
      existsInCart.quantity = quantity;

      const otherItem = cart.items.filter((item) => item.product.toString() !== productId);
      let total = otherItem.reduce((acc, item) => {
        sum += item.unitPrice * item.quantity;
        return sum;
      }, 0);

      total += existsInCart.unitPrice * quantity;
      cart.totalAmount = total;
      await cart.save();

      return {
        data: cart,
        statuscode: 200
      };
    } catch (err) {
      console.log(err);
      return {
        data: "Something went wrong",
        statuscode: 500
      };
    }
  };

interface deleteToCartRequest {
    productId: any;
    userId: string;
  }

export const deleteToCart = async ({ productId , userId  }: deleteToCartRequest)=>{
    try{
        
        const cart = await getActiveCartForUser({userId});
        const existsInCart = cart.items.find((item)=>item.product.toString()===productId);
   if(!existsInCart){
    return {data :"Item not found in cart", statuscode: 400};
   }

  const otherItem = cart.items.filter((item)=>item.product.toString() !== productId);
  cart.totalAmount -= existsInCart.unitPrice * existsInCart.quantity;
  cart.items = otherItem;
  await cart.save();
  return {
    data: cart,
    statuscode: 200
}
}catch(err){
    console.log(err)
}



}

const calculateTotalAmount = (items: cartItem[]): number => {
    return items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  };

  interface clearCartRequest {
    userId: string,
  }


 export const ClearCart = async({userId}:clearCartRequest) =>{
    try{
        
        const cart = await getActiveCartForUser({userId});
        cart.items = [];
        cart.totalAmount = 0;
   await cart.save();
   return {
    data: cart,
    statuscode: 200
  }
}catch(err){
    console.log(err)
}

  }

interface checkoutRequest {
    userId: string,
    address: string
    
  }




export const checkout = async ({ userId, address }: checkoutRequest) => {
    try {
    const cart = await getActiveCartForUser({ userId });

    if (!address) {
        return {
            data: "Address not found",
            statuscode: 400
        };
    }

    const orderItems: OrderItem[] = [];

    for (const item of cart.items) {
        const product = await ProductModel.findById(item.product);

        if (!product) {
            throw new Error("Product not found");
        }

        const orderItem: OrderItem = {
            productName: product.title,
            productImage: product.image,
            unitPrice: product.price,
            quantity: item.quantity
        };

        orderItems.push(orderItem);
    }

    const order = await OrderModel.create({
        items: orderItems,
        totalAmount: cart.totalAmount,
        address,
        userId,
        status: "pending"
    });

    cart.items = [];
    cart.totalAmount = 0;

    await cart.save();

    return {
        data: order,
        statuscode: 200
    };

} catch (error: any) {
    return {
        data: error.message,
        statuscode: 400
    };
}
    
};
  
