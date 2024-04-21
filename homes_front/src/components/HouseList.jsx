import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HouseCard from "./HouseCard";

function HouseList({ isLoggedIn }) {
  let [searchTerm, setSearchTerm] = useState("");
  let [properties, setProperties] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    async function fetchProperties() {
      try {
        let response = await fetch("http://127.0.0.1:3000/properties");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        let result = await response.json();

        setProperties(result);
      } catch (error) {
        console.error(error);
      }
    }
    fetchProperties();
  }, []);

  function handleClick(id) {
    let path = `/properties/${id}`;
    navigate(path);
  }

  function handleChange(e) {
    setSearchTerm(e.target.value);
  }

  // let filteredProperties = properties.filter((property) => {
  //   return property.name.toLowerCase().includes(searchTerm.toLowerCase());
  // });

  // <input
  //       type="text"
  //       placeholder="Search..."
  //       value={searchTerm}
  //       onChange={handleChange}
  //     ></input>

  return (
    <div className="house-list">
      {properties.map((house) => (
        <HouseCard key={house.id} house={house} />
      ))}
    </div>
  );
}

export default HouseList;
