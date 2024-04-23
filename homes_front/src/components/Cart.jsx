import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "./CartContext";
import BackButton from "./BackButton";
import CheckOutButton from "./CheckOutButton";
import { useNavigate } from "react-router-dom";

let Cart = () => {
  let { cartItems, removeFromCart, clearCart } = useCart();
  let navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") !== null
  );
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/signin");
    }
  }, [isLoggedIn, navigate]);
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
          <div>
            <CheckOutButton />
          </div>
        </div>
      }
    </>
  );
};

export default Cart;
