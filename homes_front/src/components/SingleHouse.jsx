import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import defaultHouseImage from "../assets/phoenix.jpeg";
import BackButton from "./BackButton";
let SingleHouse = () => {
  let { id } = useParams();

  let [house, setHouse] = useState(null);
  useEffect(() => {
    async function fetchHouse() {
      try {
        let response = await fetch(`http://127.0.0.1:3000/properties/${id}`);
        let result = await response.json();
        if (result) {
          setHouse(result);
        }
      } catch (error) {}
    }
    fetchHouse(), [id];
  });
  return (
    <>
      <BackButton />
      <div className="card-style">
        {house ? (
          <>
            <img src={defaultHouseImage} alt="House" className="card-image" />
            <div style={{ padding: "10px" }}>
              <h3 className="price">${house.price}</h3>
              <div>
                {house.bedrooms} bds | {house.bathrooms} ba | {house.sqft} sqft
              </div>
              <div>{house.address}</div>
              <div>{house.status}</div>
              <div>Listing by: {house.realtor}</div>
            </div>
          </>
        ) : (
          <div className="title">Loading...</div>
        )}
      </div>
    </>
  );
};

export default SingleHouse;
