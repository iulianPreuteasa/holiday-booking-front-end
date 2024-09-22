import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const SignUpContainer = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // aici va trebui sa trimit datele in baza de date ca sa se faca un cont nou
    if (password === confirmPassword && password !== "") {
      alert("You have been signed up, redirecting to login page");
      navigate("/login");
    }
  };
  return (
    <div className="vh-100 w-100 d-flex align-items-center justify-content-center">
      <form
        className="d-flex flex-column justify-content-center align-items-center border rounded shadow-lg p-3"
        onSubmit={handleSubmit}
      >
        <input
          className="form-control mb-3"
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="name"
          placeholder="Name"
        />
        <input
          className="form-control mb-3"
          type="text"
          name="surname"
          id="surname"
          placeholder="Surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
        <input
          className="form-control mb-3"
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="form-control mb-3"
          type="password"
          name="passowrd"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <input
          className="form-control mb-3"
          type="password"
          name="confirm-password"
          id="confirm-password"
          placeholder="Confirm Passowrd"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit" className="btn btn-primary mb-3">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignUpContainer;
