import { createContext, useState, useContext, useEffect } from "react";

let CartContext = createContext();

let useCart = () => useContext(CartContext);

let CartProvider = ({ children }) => {
  let [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    let fetchCartItems = async () => {
      try {
        let response = await fetch("/user/:userId/cart");
        if (!response.ok) {
          throw new Error("Failed to fetch cart items");
        }
        let result = await response.json();
        setCartItems(result);
      } catch (error) {
        console.error("Error fetching cart items: ", error);
      }
    };
    fetchCartItems();
  }, []);
  let addToCart = async (item) => {
    try {
      let response = await fetch("http://127.0.0.1:3000/users/:userId/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
      let newItem = await response.json();
      setCartItems((currentItems) => [...currentItems, newItem]);
    } catch (error) {
      console.error("Error adding item to cart: ", error);
    }
  };
  let removeFromCart = async (itemId) => {
    try {
      let response = await fetch(
        "http://127.0.0.1:3000/users/:userId/cart/:houseId",
        {
          method: "DELETE",
        }
      );
      setCartItems((currentItems) =>
        currentItems.filter((item) => item.id !== itemId)
      );
    } catch (error) {
      console.error("Error removing item from cart: ", error);
    }
    setCartItems([...cartItems, item]);
  };

  let clearCart = async () => {
    try {
      await fetch("/users/:userId/cart", {
        method: "DELETE",
      });
      setCartItems([]);
    } catch (error) {
      console.error("Error clearing cart: ", error);
    }
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, useCart, CartProvider };
