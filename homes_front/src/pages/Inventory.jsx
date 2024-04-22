import { useState, useEffect } from "react";
import defaultHouseImage from "../assets/phoenix.jpeg";
import AddToCartButton from "./AddToCartButton";
let Inventory = ({ isLoggedIn }) => {
  let [user, setUser] = useState([]);
  useEffect(() => {
    async function fetchUser() {
      try {
        let response = await fetch("http://localhost:3000/user", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        let result = await response.json();

        if (result) {
          console.log(result);
          setUser(result);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchUser();
  }, []);
  return (
    <>
      {/* <img src={defaultHouseImage} alt="House" className="card-image"></img> */}
      <div style={{ padding: "10px" }}>
        <h3 className="price">${user.username}</h3>
      </div>
    </>
  );
};

export default Inventory;
