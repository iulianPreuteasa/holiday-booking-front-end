import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoginView from "../views/LoginView";

export default function LoginController() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/home");
    } catch {
      alert("Invalid email or password.");
    }
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <LoginView
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      onSubmit={handleSubmit}
      onSignUp={handleSignUp}
    />
  );
}
