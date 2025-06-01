import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import NavBar from "../views/NavBar";
import React from "react";

export default function NavBarController() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <NavBar
      name={user?.name}
      surname={user?.surname}
      onLogout={handleLogout}
      navigateTo={handleNavigation}
    />
  );
}
