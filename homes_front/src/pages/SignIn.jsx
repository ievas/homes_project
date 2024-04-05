import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function SignIn({ setToken }) {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");

  let navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
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
      setToken(result.token);

      setUsername("");
      setPassword("");

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2 className="title">Sign In:</h2>
        <label>
          Username:{" "}
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>

        <label>
          Password:{" "}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button className="submit">Submit</button>
      </form>
    </>
  );
}
export default SignIn;
