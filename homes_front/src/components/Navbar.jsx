import { Link } from "react-router-dom";

function Navbar({ token, setToken }) {
  function handleLogout() {
    setToken(null);
  }

  return (
    <>
      {token ? (
        <>
          <Link to="/">Homes</Link>
          <Link to="/create">Create</Link>
          <Link to="/account">Inventory</Link>
          <button id="logout" onClick={handleLogout}>
            logout
          </button>
        </>
      ) : (
        <>
          <Link to="/">Homes</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/signin">Sign In</Link>
        </>
      )}
    </>
  );
}

export default Navbar;
