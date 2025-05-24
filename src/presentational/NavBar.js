import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NavBar = ({ name, surname, onLogout }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const loggingout = async () => {
    await logout();
    navigate("/login");
  };
  return (
    <div className="container-fluide p-3 border-bottom border-primary rounded d-flex justify-content-between">
      <p>{name ? `Welcome, ${name} ${surname}!` : "No user data available"}</p>
      <div>
        <button
          className="btn btn-primary m-2"
          onClick={() => navigate("/home")}
        >
          Home
        </button>
        <button
          className="btn btn-primary m-2"
          onClick={() => navigate("/bookings")}
        >
          Bookings
        </button>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/notifications")}
        >
          Notifications
        </button>
        <button onClick={loggingout} className="btn btn-primary m-2">
          Log Out
        </button>
      </div>
    </div>
  );
};

export default NavBar;
