import React from "react";

export default function LoginView({
  email,
  setEmail,
  password,
  setPassword,
  onSubmit,
  onSignUp,
}) {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="container-sm col-6 d-flex flex-column justify-content-center align-items-center">
        <form
          onSubmit={onSubmit}
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
            <button className="py-1 btn btn-secondary" onClick={onSignUp}>
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
