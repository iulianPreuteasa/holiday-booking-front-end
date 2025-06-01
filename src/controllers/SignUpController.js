import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignUpView from "../views/SignUpView";
import { signUpUser } from "../models/authModel";
import { signupSchema } from "../validation/signupSchema";

export default function SignUpController() {
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
      signupSchema.parse(formData);
      setErrors({});

      await signUpUser({ name, surname, email, password });
      alert("You have been signed up, redirecting to login page");
      navigate("/login");
    } catch (err) {
      if (err.errors) {
        const fieldErrors = {};
        err.errors.forEach((error) => {
          fieldErrors[error.path[0]] = error.message;
        });
        setErrors(fieldErrors);
      } else {
        console.error("Error signing up:", err);
        alert("There is an error, try again!");
      }
    }
  };

  return (
    <SignUpView
      name={name}
      surname={surname}
      email={email}
      password={password}
      confirmPassword={confirmPassword}
      setName={setName}
      setSurname={setSurname}
      setEmail={setEmail}
      setPassword={setPassword}
      setConfirmPassword={setConfirmPassword}
      errors={errors}
      onSubmit={handleSubmit}
      onGoToLogin={() => navigate("/login")}
    />
  );
}
