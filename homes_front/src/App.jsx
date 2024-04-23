import { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import { CartProvider } from "./components/CartContext";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Navbar from "./components/Navbar";
import CreateHouse from "./pages/CreateHouse";
import Inventory from "./pages/Inventory";
import HouseList from "./components/HouseList";
import Header from "./components/Header";
import SingleHouse from "./components/SingleHouse";
import Cart from "./components/Cart";
import CheckOut from "./pages/CheckOut";

function App() {
  let [isLoggedIn, setIsLoggedIn] = useState(false);
  let [properties, setProperties] = useState([]);
  let [sortedProperties, setSortedProperties] = useState([]);
  let [user, setUser] = useState(null);

  function handleSort(sortValue) {
    let sorted = [...properties];
    switch (sortValue) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "sqft-asc":
        sorted.sort((a, b) => a.sqft - b.sqft);
        break;
      case "sqft-desc":
        sorted.sort((a, b) => b.sqft - a.sqft);
        break;
      default:
        break;
    }
    setSortedProperties(sorted);
  }
  useEffect(() => {
    async function fetchProperties() {
      try {
        let response = await fetch("http://127.0.0.1:3000/properties");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        let result = await response.json();

        setProperties(result);
        setSortedProperties(result);
      } catch (error) {
        console.error(error);
      }
    }
    fetchProperties();
  }, []);

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
        <Header handleSort={handleSort} />
        <Routes>
          <Route
            path="/"
            element={
              <HouseList
                isLoggedIn={isLoggedIn}
                sortedProperties={sortedProperties}
                setSortedProperties={setSortedProperties}
              />
            }
          />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/signin"
            element={<SignIn setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/properties/:id" element={<SingleHouse />} />
          <Route path="user/create" element={<CreateHouse />} />
          <Route path="user/inventory" element={<Inventory />} />
          <Route path="/user/cart" element={<Cart isLoggedIn={isLoggedIn} />} />
          <Route
            path="/user/checkout"
            element={<CheckOut isLoggedIn={isLoggedIn} />}
          />
        </Routes>
      </CartProvider>
    </>
  );
}

export default App;
