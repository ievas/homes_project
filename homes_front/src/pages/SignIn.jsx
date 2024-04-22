import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function SignIn({ setIsLoggedIn }) {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [error, setError] = useState("");
  let [isLoading, setIsLoading] = useState(false);

  let navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      let response = await fetch("http://localhost:3000/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      let result = await response.json();

      if (result.token) {
        localStorage.setItem("token", result.token);
        setIsLoggedIn(true);
        navigate("/");
      } else {
        setError("No token received");
      }
      setIsLoading(false);
      setUsername("");
      setPassword("");
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  }

  return (
    <>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <h2 className="title">
          Log In or{" "}
          <Link
            to="/signup"
            style={{ color: "lightBlue", padding: 5, margin: 1 }}
          >
            Register
          </Link>
        </h2>
        <label>
          Username:{" "}
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>

        <label>
          Password:{" "}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <button className="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Submit"}
        </button>
      </form>
    </>
  );
}
export default SignIn;
