import { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import { CartProvider } from "./components/CartContext";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Navbar from "./components/Navbar";
import CreateHouse from "./pages/CreateHouse";
import HouseList from "./components/HouseList";
import Header from "./components/Header";
import SingleHouse from "./components/SingleHouse";
import Cart from "./components/Cart";

function App() {
  let [isLoggedIn, setIsLoggedIn] = useState(false);
  let [properties, setProperties] = useState({});

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <>
      <CartProvider>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <h1>
          <Link to="/">Homes</Link>
        </h1>
        <Header />
        <Routes>
          <Route path="/" element={<HouseList isLoggedIn={isLoggedIn} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/signin"
            element={<SignIn setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/properties/:id" element={<SingleHouse />} />
          <Route path="user/userId/create" element={<CreateHouse />} />
          <Route path="user/userId/inventory" element={<CreateHouse />} />
          <Route path="/user/:id/cart" element={<Cart />} />
        </Routes>
      </CartProvider>
    </>
  );
}

export default App;
