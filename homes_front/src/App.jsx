import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Navbar from "./components/Navbar";
import CreateHouse from "./pages/CreateHouse";

function App() {
  let [token, setToken] = useState(null);

  return (
    <>
      <Navbar token={token} setToken={setToken} />
      <h1>
        <div className="logo">".."</div>Homes
      </h1>

      <Routes>
        <Route path="/" />
        <Route
          path="/signup"
          element={<SignUp token={token} setToken={setToken} />}
        />
        <Route
          path="/signin"
          element={<SignIn token={token} setToken={setToken} />}
        />
        <Route path="/create" element={<CreateHouse />} />
      </Routes>
    </>
  );
}

export default App;
