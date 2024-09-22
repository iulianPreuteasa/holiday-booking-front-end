import React, { useState } from "react";
import { users } from "../data/fakeData";
import { useNavigate } from "react-router-dom";

const LoginInContainer = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // aici trebue sa fac verificarea data email si parola corespund cu cele din baza de date
    const valid = users.filter(
      (user) => user.email === email && user.parola === password
    );
    if (valid.length === 1) {
      navigate("/profile", {
        state: {
          name: valid[0].nume,
          surname: valid[0].prenume,
          acceptat: valid[0].concedii.acceptat,
          respins: valid[0].concedii.respins,
          asteptare: valid[0].concedii.asteptare,
        },
      });
    } else {
      alert("Try again!");
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
          className="d-flex flex-column w-100 p-4 border rounded shadow-lg"
        >
          <input
            type="text"
            name="email"
            id="email"
            className="form-control mb-3"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            id="password"
            className="form-control mb-3"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
