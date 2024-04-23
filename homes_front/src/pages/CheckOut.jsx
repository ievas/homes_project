import { useState, useEffect } from "react";
import defaultHouseImage from "../assets/phoenix.jpeg";
import BackButton from "../components/BackButton";
import { useCart } from "../components/CartContext";

let CheckOut = ({ isLoggedIn }) => {
  let [user, setUser] = useState([]);
  let [documentsSigned, setDocumentsSigned] = useState(false);
  let { cartItems, removeFromCart, clearCart } = useCart();
  let [orderPlaced, setOrderPlaced] = useState(false);

  let handleCheckOut = () => {
    console.log("Place the order");
    setOrderPlaced(true);
    clearCart();
    // setTimeout(() => {
    //   setOrderPlaced(false);
    // }, 6000);
  };

  let handleSigning = () => {
    setDocumentsSigned(true);
  };

  return (
    <>
      {/* <img src={defaultHouseImage} alt="House" className="card-image"></img> */}

      <div style={{ padding: "10px" }}>
        <h3>Check out Houses in your cart</h3>
        <div>
          {
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
          }
        </div>
        <div
          className={`${documentsSigned ? "signed" : "sign"}`}
          style={{ padding: "10px", fontSize: 34 }}
          onClick={handleSigning}
        >
          {documentsSigned ? "Documents Signed" : "Sign the documents"}
        </div>
        {!orderPlaced && (
          <button
            className={`order-button ${documentsSigned ? "enabled" : ""}`}
            disabled={!documentsSigned}
            onClick={handleCheckOut}
          >
            Place Order
          </button>
        )}

        {orderPlaced && <h1 className="purchased-title">PURCHASED</h1>}
      </div>
      <BackButton />
    </>
  );
};

export default CheckOut;
