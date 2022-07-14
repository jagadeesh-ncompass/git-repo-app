import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [passWord, setpassWord] = useState("");
  const [error, setError] = useState("");
  const Navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const val = {
      email: userName,
      password: passWord,
    };
    const url = "http://localhost:3000/login";
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        email: val.email,
        password: val.password,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.statusCode && data.statusCode === 401) {
          setError(true);
          return;
        }
        if (data.statusCode && data.statusCode === 404) {
          setError(true);
          return;
        }
        Navigate("/dashboard", { replace: true });
        localStorage.setItem("token", data.access_token);
      });
  };

  return (
    <div className="form">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-container">
          <label>Email </label>
          <input
            type="email"
            placeholder="Enter Your Email Id"
            name="uname"
            required
            onChange={(e) => {
              setUserName(e.target.value);
              setError("");
            }}
            value={userName}
          />
        </div>
        <div className="input-container">
          <label>Password </label>
          <input
            type="password"
            name="pass"
            placeholder="Enter Your Password"
            required
            onChange={(e) => {
              setpassWord(e.target.value);
              setError("");
            }}
            value={passWord}
          />
        </div>
        {error && (
          <p className="errormessage" id="error">
            Check your Email or Password!
          </p>
        )}
        <br></br>
        <div className="button-container">
          <button className="btn" type="submit">
            LOG IN
          </button>
        </div>
      </form>
    </div>
  );
}
