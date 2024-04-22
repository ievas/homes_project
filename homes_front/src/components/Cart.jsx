import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "./CartContext";
import BackButton from "./BackButton";
import { useNavigate } from "react-router-dom";

let Cart = ({ isLoggedIn, userId }) => {
  let { cartItems, removeFromCart, clearCart } = useCart();
  let navigate = useNavigate();
  console.log("CART ITEMS:", JSON.stringify(cartItems, null, 2));
  useEffect(() => {
    if (!isLoggedIn && cartItems.length === 0) {
      navigate("/signin");
    }
  }, [isLoggedIn]);
  return (
    <>
      {
        <div>
          <BackButton />
          <h2>Your Cart</h2>
          <ul>
            {cartItems.map((item) => (
              <li key={item.cart_item_id}>
                {item.address} - ${item.price}
                <button onClick={() => removeFromCart(item.cart_item_id)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <button onClick={clearCart}>Clear Cart</button>
        </div>
      }
    </>
  );
};

export default Cart;
