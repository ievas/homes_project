import { useState, useEffect } from "react";
import defaultHouseImage from "../assets/phoenix.jpeg";
import BackButton from "../components/BackButton";

let CheckOut = ({ isLoggedIn }) => {
  let [user, setUser] = useState([]);
  let [documentsSigned, setDocumentsSigned] = useState(false);

  let handleCheckOut = () => {
    console.log("Sign the papers");
  };

  let handleSigning = () => {
    setDocumentsSigned(true);
  };

  return (
    <>
      {/* <img src={defaultHouseImage} alt="House" className="card-image"></img> */}

      <div style={{ padding: "10px" }}>
        <h3>Check out </h3>
        <div onClick={handleSigning}>Sign the documents</div>
        <button className="order-button">Place Order</button>
      </div>
      <BackButton />
    </>
  );
};

export default CheckOut;
