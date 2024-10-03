import React from "react";
import { useNavigate } from "react-router-dom";

const NavBar = ({ name, surname, onLogout }) => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("user");
    onLogout();
    navigate("/login");
  };
  return (
    <div className="container-fluide p-3 border-bottom border-primary rounded d-flex justify-content-between">
      <p>{name ? `Welcome, ${name} ${surname}!` : "No user data available"}</p>
      <button onClick={logout} className="btn btn-primary ">
        Log Out
      </button>
    </div>
  );
};

export default NavBar;
