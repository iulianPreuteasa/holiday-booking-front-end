import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { z } from "zod";

const schema = z
  .object({
    name: z.string().min(2, "Name must have at least 2 characters"),
    surname: z.string().min(2, "Surname must have at least 2 characters"),
    email: z.string().email("Email invalid"),
    password: z.string().min(6, "Password must have at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password don't match",
    path: ["confirmPassword"],
  });

const SignUpContainer = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = { name, surname, email, password, confirmPassword };

    try {
      // Validare Zod
      schema.parse(formData);
      setErrors({});

      // Trimite cererea de autentificare către server
      const response = await axios.post("http://localhost:5000/users/signup", {
        name,
        surname,
        email,
        password,
      });

      alert("You have been signed up, redirecting to login page");
      navigate("/login");
    } catch (err) {
      if (err.errors) {
        // Mapare erori Zod într-un obiect {field: message}
        const fieldErrors = {};
        err.errors.forEach((error) => {
          fieldErrors[error.path[0]] = error.message;
        });
        setErrors(fieldErrors);
      } else {
        // Alte erori (ex: axios)
        console.error("Error signing up:", err);
        alert("A apărut o eroare, încearcă din nou.");
      }
    }
  };

  return (
    <>
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
            className="form-control mb-1"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            placeholder="Name"
          />
          {errors.name && (
            <small className="text-danger mb-2">{errors.name}</small>
          )}

          <input
            className="form-control mb-1"
            type="text"
            name="surname"
            id="surname"
            placeholder="Surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
          {errors.surname && (
            <small className="text-danger mb-2">{errors.surname}</small>
          )}

          <input
            className="form-control mb-1"
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <small className="text-danger mb-2">{errors.email}</small>
          )}

          <input
            className="form-control mb-1"
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          {errors.password && (
            <small className="text-danger mb-2">{errors.password}</small>
          )}

          <input
            className="form-control mb-3"
            type="password"
            name="confirmPassword"
            id="confirm-password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && (
            <small className="text-danger mb-3">{errors.confirmPassword}</small>
          )}

          <button type="submit" className="btn btn-primary mb-3">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default SignUpContainer;
