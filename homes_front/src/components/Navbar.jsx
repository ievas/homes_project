import { Link } from "react-router-dom";

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  function handleLogout() {
    setIsLoggedIn(false);
  }

  return (
    <>
      {isLoggedIn ? (
        <>
          <Link to="/">Homes</Link>
          <Link to="/create">Create</Link>
          <Link to="/account">Inventory</Link>
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
    </>
  );
}

export default Navbar;
