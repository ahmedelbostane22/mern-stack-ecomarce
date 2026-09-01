import { useCart } from "../context/Cart/cartContext";

export const CartPage = () => {
  const { cartItems, totalAmount } = useCart();

  console.log("Cart Items:", cartItems);

  return (
    <div>
      <h1>Cart</h1>

      {cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.productId}>
              <img
                src={item.image}
                alt={item.title}
                width={100}
              />

              <h3>{item.title}</h3>

              <p>Price: {item.unitPrice}</p>

              <p>Quantity: {item.quantity}</p>
            </div>
          ))}

          <h2>Total: {totalAmount}</h2>
        </>
      )}
    </div>
  );
};