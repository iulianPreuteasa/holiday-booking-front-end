import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginInContainer = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(email, password); // folosești funcția din context
      navigate("/home");
    } catch {
      alert("Invalid email or password.");
    }
  };

  const signUp = () => {
    navigate("/signup");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="container-sm col-6 d-flex flex-column justify-content-center align-items-center">
        <form
          onSubmit={handleSubmit}
          className="d-flex flex-column mw-50 p-4 border rounded shadow-lg"
        >
          <input
            type="text"
            name="email"
            id="email"
            className="form-control mb-3"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            name="password"
            id="password"
            className="form-control mb-3"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary">
            Login
          </button>
          <div className="mt-4 d-flex justify-content-around align-items-center">
            <p>You don't have an account?</p>
            <button className="py-1 btn btn-secondary" onClick={signUp}>
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginInContainer;
