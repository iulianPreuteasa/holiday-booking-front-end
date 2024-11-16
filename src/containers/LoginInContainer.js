import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginInContainer = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Trimite cererea de autentificare către server
      const response = await axios.post("http://localhost:5000/users/login", {
        email,
        password,
      });

      // Serverul ar trebui să returneze datele utilizatorului dacă autentificarea este validă
      const user = response.data.user;
      // Stochează utilizatorul în localStorage pentru a păstra sesiunea
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: user.name,
          surname: user.surname,
          userId: user._id,
        })
      );

      // Redirecționează către pagina "Home"
      navigate("/home");
    } catch (error) {
      // În caz de eroare, arată un mesaj de eroare
      console.error("Error logging in:", error);
      alert("Invalid email or password. Please try again!");
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
