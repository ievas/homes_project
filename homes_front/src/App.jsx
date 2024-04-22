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
  let [user, setUser] = useState(null);

  // useEffect(() => {
  //   async function fetchUser() {
  //     try {
  //       let response = await fetch("http://localhost:3000/user", {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       let result = await response.json();

  //       if (result) {
  //         console.log(result);
  //         setUser(result);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   fetchUser();
  // }, []);

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
          <Route path="user/create" element={<CreateHouse />} />
          <Route path="user/inventory" element={<CreateHouse />} />
          <Route path="/user/cart" element={<Cart isLoggedIn={isLoggedIn} />} />
        </Routes>
      </CartProvider>
    </>
  );
}

export default App;
