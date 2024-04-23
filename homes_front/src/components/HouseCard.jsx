import defaultHouseImage from "../assets/phoenix.jpeg";
import AddToCartButton from "./AddToCartButton";
import { useState, useEffect } from "react";
let HouseCard = ({ house, isLoggedIn }) => {
  let token = localStorage.getItem("token");
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
      <img src={defaultHouseImage} alt="House" className="card-image"></img>
      <div style={{ padding: "10px" }}>
        <h3 className="price">${house.price}</h3>
        <div>
          {house.bedrooms} bds | {house.bathrooms} ba | {house.sqft} sqft
        </div>
        <div>{house.address}</div>
        <div>{house.status}</div>
        <div>Listing by: {house.realtor}</div>

        {isLoggedIn && <AddToCartButton itemId={house.id} />}
      </div>
    </>
  );
};

export default HouseCard;
