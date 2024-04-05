import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function SignUp({ setToken }) {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  //   let [success, setSuccess] = useState("");
  let navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let response = await fetch("http://localhost:3000/signup", {
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
      //   setSuccess(true);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2 className="title">Sign Up:</h2>
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
export default SignUp;
