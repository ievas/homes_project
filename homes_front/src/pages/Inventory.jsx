import { useState, useEffect } from "react";
import defaultHouseImage from "../assets/phoenix.jpeg";

let Inventory = ({ isLoggedIn }) => {
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
      {/* <img src={defaultHouseImage} alt="House" className="card-image"></img> */}
      <div style={{ padding: "10px" }}>
        <h3>Your Properties:</h3>
        <h4>Tokens:</h4>
        <h3 className="username">${user.username}</h3>
      </div>
    </>
  );
};

export default Inventory;
