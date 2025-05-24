import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUpContainer = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // aici va trebui sa trimit datele in baza de date ca sa se faca un cont nou
    try {
      // Trimite cererea de autentificare către server
      if (password !== confirmPassword || password === "") {
        alert("password doesen't match or empty");
        return;
      }
      const response = await axios.post("http://localhost:5000/users/signup", {
        name,
        surname,
        email,
        password,
      });

      alert("You have been signed up, redirecting to login page");
      // Redirecționează către pagina "Login"
      navigate("/login");
    } catch (error) {
      // În caz de eroare, arată un mesaj de eroare
      console.error("Error Signed in in:", error);
    }
  };
  return (
    <>
      {" "}
      <div className="container-fluide p-3 border-bottom border-primary rounded d-flex justify-content-between">
        <button className="btn btn-primary" onClick={() => navigate("/login")}>
          Login Page
        </button>
      </div>
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
    </>
  );
};

export default SignUpContainer;
