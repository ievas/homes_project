import { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Navbar from "./components/Navbar";
import CreateHouse from "./pages/CreateHouse";
import HouseList from "./components/HouseList";

function App() {
  let [isLoggedIn, setIsLoggedIn] = useState(false);

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
      <Navbar isLoggedIn={isLoggedIn} />
      <h1>
        <div className="logo">".."</div>Homes
      </h1>

      <Routes>
        <Route path="/" element={<HouseList />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/create" element={<CreateHouse />} />
      </Routes>
    </>
  );
}

export default App;
