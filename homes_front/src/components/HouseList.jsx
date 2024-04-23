import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HouseCard from "./HouseCard";
import SortFilter from "./SortFilter";

function HouseList({ isLoggedIn, sortedProperties, setSortedProperties }) {
  let [searchTerm, setSearchTerm] = useState("");
  let [properties, setProperties] = useState([]);
  // let [sortedProperties, setSortedProperties] = useState([]);

  let navigate = useNavigate();

  function handleClick(id) {
    let path = `/properties/${id}`;
    navigate(path);
  }

  // function handleSort(sortValue) {
  //   let sorted = [...properties];
  //   switch (sortValue) {
  //     case "price-asc":
  //       sorted.sort((a, b) => a.price - b.price);
  //       break;
  //     case "price-desc":
  //       sorted.sort((a, b) => b.price - a.price);
  //       break;
  //     case "sqft-asc":
  //       sorted.sort((a, b) => a.sqft - b.sqft);
  //       break;
  //     case "sqft-desc":
  //       sorted.sort((a, b) => b.sqft - a.sqft);
  //       break;
  //     default:
  //       break;
  //   }
  //   setSortedProperties(sorted);
  // }

  return (
    <>
      <div className="house-list">
        {/* <SortFilter onSortChange={handleSort} /> */}

        {sortedProperties.map((house) => (
          <div
            className="card-style"
            key={house.id}
            onClick={() => {
              handleClick(house.id);
            }}
          >
            <HouseCard house={house} isLoggedIn={isLoggedIn} />
          </div>
        ))}
      </div>
    </>
  );
}

export default HouseList;
