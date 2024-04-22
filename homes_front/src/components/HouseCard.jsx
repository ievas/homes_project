import defaultHouseImage from "../assets/phoenix.jpeg";
let HouseCard = ({ house }) => {
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
      </div>
    </>
  );
};

export default HouseCard;
