import React from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      {/* esti logat ? daca da afiseaza butonul de sign out si numele persoanei logatte : daca nu redirectioneaza pe pagina de login */}
      <button onClick={() => navigate("/login")}>Login In</button>
    </div>
  );
};

export default NavBar;
