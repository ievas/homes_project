import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function SignIn() {
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
      let response = await fetch("http://127.0.0.1:3000/signin", {
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
      console.log(result);
      if (result.token) {
        localStorage.setItem("token", result.token);
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
        <h2 className="title">Sign In:</h2>
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
