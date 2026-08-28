import { useEffect, useState } from "react";
import { cartUrl } from "../constants/api";
// import type { Cart } from "../model/cart";
import { useAuth } from "../context/Auth/authContext";

export const CartPage = () => {
    const [cartItems, setCartItems] = useState<unknown[]>([]);
    const { token } = useAuth();

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await fetch(cartUrl, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                
                if (!response.ok) {
                    throw new Error("Failed to fetch cart items");
                }

                const data = await response.json();
                if (!data) {
                    throw new Error("Failed to fetch cart items");
                }

                setCartItems(data);
            } catch (error) {
                console.error("Error fetching cart items:", error);
            }
        };

        fetchCartItems();
    }, [token]);
    console.log(cartItems);

    return <div>{cartItems.length ? JSON.stringify(cartItems) : "CartPage"}</div>;
};