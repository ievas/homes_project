import { createContext, useState, useContext, useEffect } from "react";

let CartContext = createContext();

let useCart = () => useContext(CartContext);

let CartProvider = ({ children }) => {
  let [cartItems, setCartItems] = useState([]);
  let [userId, setUserId] = useState(null);

  useEffect(() => {
    let fetchCartItems = async () => {
      try {
        let response = await fetch(`http://localhost:3000/users/cart`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
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
  }, [userId]);

  let addToCart = async (item) => {
    try {
      let response = await fetch(`http://localhost:3000/users/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(item),
      });
      if (!response.ok) {
        throw new Error("Failed to add item to cart");
      }
      let newItem = await response.json();
      setCartItems((currentItems) => [...currentItems, newItem]);
    } catch (error) {
      console.error("Error adding item to cart: ", error);
    }
  };
  let removeFromCart = async (itemId) => {
    try {
      let response = await fetch(`http://localhost:3000/users/cart/${itemId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCartItems((currentItems) => {
        return currentItems.filter((item) => item.cart_item_id !== itemId);
      });
    } catch (error) {
      console.error("Error removing item from cart: ", error);
    }
  };

  let clearCart = async () => {
    try {
      await fetch(`http://localhost:3000/users/cart`, {
        method: "DELETE",
      });
      setCartItems([]);
    } catch (error) {
      console.error("Error clearing cart: ", error);
    }
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, userId }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, useCart, CartProvider };
