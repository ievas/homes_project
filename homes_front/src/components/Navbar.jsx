import { Link } from "react-router-dom";
import { useCart } from "./CartContext";

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  function handleLogout() {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
  }
  const { cartItems } = useCart();

  return (
    <>
      <div className="navbar">
        {isLoggedIn ? (
          <>
            <Link to="/user/create">Create</Link>
            <Link to="/user/inventory">Inventory</Link>
            <Link to="/user/cart">Cart({cartItems.length})</Link>
            <button id="logout" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/">Properties For Sale</Link>
            {/* <Link to="/signup">Sign Up</Link> */}
            <Link to="/signin">Log In</Link>
          </>
        )}
      </div>
    </>
  );
}

export default Navbar;
