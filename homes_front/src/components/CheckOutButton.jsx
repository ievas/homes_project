import { useNavigate } from "react-router-dom";

let CheckOutButton = () => {
  let navigate = useNavigate();
  let goToCheckout = () => {
    navigate("/user/checkout");
  };
  return (
    <>
      <button onClick={goToCheckout} className="checkout_button">
        ← Proceed to checkout, Sign the documents →
      </button>
    </>
  );
};

export default CheckOutButton;
