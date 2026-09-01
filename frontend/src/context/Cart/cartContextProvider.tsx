/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState, type PropsWithChildren } from "react";
import type { cartItem } from "../../model/cart";
import { CartContext } from "./cartContext";
import { cartAddUrl, cartUrl } from "../../constants/api";
import { useAuth } from "../Auth/authContext";

const CartContextProvider = ({ children }: PropsWithChildren) => {
  const [cartItems, setCartItems] = useState<cartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const { token } = useAuth();

  // =========================
  // Get Cart
  // =========================
const getCart = async () => {
  try {
    if (!token) {
      setCartItems([]);
      setTotalAmount(0);
      return;
    }

    const response = await fetch(cartUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    console.log("GET CART RESPONSE:", data);

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch cart");
    }

    if (!data || !data.items) {
      throw new Error("Invalid cart response");
    }

    const formattedCartItems: cartItem[] = data.items.map(
      (item: any) => ({
        productId: item.product._id,
        title: item.product.title,
        image: item.product.image,
        unitPrice: item.unitPrice,
        quantity: item.quantity,
      })
    );

    setCartItems(formattedCartItems);
    setTotalAmount(data.totalAmount);

  } catch (error) {
    console.error("Error fetching cart:", error);
  }
};

  // =========================
  // Add To Cart
  // =========================
 const addToCart = async (productId: string) => {
  try {
    if (!token) {
      throw new Error("User is not authenticated");
    }

    const response = await fetch(cartAddUrl, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        productId,
        quantity: 1,
      }),
    });

    const data = await response.json();

    console.log("ADD CART RESPONSE:", data);

    if (!response.ok) {
      throw new Error(data.message || "Failed to add to cart");
    }

    // بعد ما المنتج يتضاف في MongoDB
    // نجيب الـ cart المحدث
    await getCart();

  } catch (error) {
    console.error("Error adding to cart:", error);
  }
};
  // =========================
  // Load cart when token changes
  // =========================
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getCart();
  }, [token]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        totalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;