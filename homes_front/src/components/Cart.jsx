import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "./CartContext";
import BackButton from "./BackButton";

let Cart = () => {
  let { cartItems, removeFromCart, clearCart } = useCart();
  return (
    <>
      <div>
        <BackButton />
        <h2>Your Cart</h2>
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.name} - ${item.price}
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
        <button onClick={clearCart}>Clear Cart</button>
      </div>
    </>
  );
};

export default Cart;
