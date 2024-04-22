import { Link } from "react-router-dom";

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  function handleLogout() {
    setIsLoggedIn(false);
  }

  return (
    <>
      <div className="navbar">
        {isLoggedIn ? (
          <>
            <Link to="/user/:userId/create">Create</Link>
            <Link to="/user/:userId/inventory">Inventory</Link>
            <Link to="/user/:userId/cart">Cart({0})</Link>
            <button id="logout" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/">Homes For Sale</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/signin">Sign In</Link>
          </>
        )}
      </div>
    </>
  );
}

export default Navbar;
