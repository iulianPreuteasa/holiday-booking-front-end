import React from "react";

export default function SignUpView({
  name,
  surname,
  email,
  password,
  confirmPassword,
  setName,
  setSurname,
  setEmail,
  setPassword,
  setConfirmPassword,
  errors,
  onSubmit,
  onGoToLogin,
}) {
  return (
    <>
      <div className="container-fluide p-3 border-bottom border-primary rounded d-flex justify-content-between">
        <button className="btn btn-primary" onClick={onGoToLogin}>
          Login Page
        </button>
      </div>
      <div className="vh-100 w-100 d-flex align-items-center justify-content-center">
        <form
          className="d-flex flex-column justify-content-center align-items-center border rounded shadow-lg p-3"
          onSubmit={onSubmit}
        >
          <input
            className="form-control mb-1"
            type="text"
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && (
            <small className="text-danger mb-2">{errors.name}</small>
          )}

          <input
            className="form-control mb-1"
            type="text"
            value={surname}
            placeholder="Surname"
            onChange={(e) => setSurname(e.target.value)}
          />
          {errors.surname && (
            <small className="text-danger mb-2">{errors.surname}</small>
          )}

          <input
            className="form-control mb-1"
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <small className="text-danger mb-2">{errors.email}</small>
          )}

          <input
            className="form-control mb-1"
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <small className="text-danger mb-2">{errors.password}</small>
          )}

          <input
            className="form-control mb-3"
            type="password"
            value={confirmPassword}
            placeholder="Confirm Password"
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
}
