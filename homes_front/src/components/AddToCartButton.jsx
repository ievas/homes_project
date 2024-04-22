import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useCart } from "./CartContext";

let AddToCartButton = ({ itemId }) => {
  let { id } = useParams();
  let { cartItems, addToCart } = useCart();
  //   let navigate = useNavigate();
  let handleAddToCart = (houseId, event) => {
    event.stopPropagation();
    event.preventDefault();
    // console.log(itemId);
    let newItem = {
      cart_item_id: itemId,
      user_id: id,
      property_id: houseId,
      quantity: 1,
    };
    addToCart(newItem);
  };
  return (
    <>
      <button
        onClick={(event) => handleAddToCart(itemId, event)}
        className="cart-plus-button"
      >
        Add to cart
      </button>
    </>
  );
};

export default AddToCartButton;
