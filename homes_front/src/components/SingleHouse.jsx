import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import defaultHouseImage from "../assets/phoenix.jpeg";
import defaultHouseImage2 from "../assets/phoenix2.jpg";
import defaultHouseImage3 from "../assets/phoenix3.jpg";
import defaultHouseImage4 from "../assets/phoenix4.jpg";
import defaultHouseImage5 from "../assets/phoenix6.jpg";
import BackButton from "./BackButton";
import AddToCatButton from "./AddToCartButton";

let SingleHouse = () => {
  let { id } = useParams();
  let images = [
    defaultHouseImage,
    defaultHouseImage2,
    defaultHouseImage3,
    defaultHouseImage4,
    defaultHouseImage5,
  ];

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
      <div className="single-card-style">
        {house ? (
          <>
            <div className="house-images">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`House view ${index + 1}`}
                  className={
                    index === 0
                      ? "house-image main-image"
                      : "house-image sub-image"
                  }
                />
              ))}
            </div>

            <div style={{ padding: "10px" }}>
              <h3 className="price">${house.price}</h3>
              <div>
                {house.bedrooms} bds | {house.bathrooms} ba | {house.sqft} sqft
              </div>
              <div>{house.address}</div>
              <div>{house.status}</div>
              <div>Listing by: {house.realtor}</div>
              <AddToCatButton />
            </div>
            <div
              style={{
                maxWidth: 300,
              }}
              className="description"
            >
              {house.description}
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
