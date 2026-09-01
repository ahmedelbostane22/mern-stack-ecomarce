
import { createContext, useContext } from "react";
import type { cartItem } from "../../model/cart";

interface CartContextType {
  cartItems: cartItem[];
  totalAmount: number;
  addToCart: (productId: string) => void;
}

export const CartContext = createContext<CartContextType | null>(null);

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartContextProvider"
    );
  }

  return context;
};

