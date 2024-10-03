import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import React, { useEffect, useState } from "react";
import LoginInContainer from "./containers/LoginInContainer";
import Home from "./presentational/Home";
import SignUpContainer from "./containers/SignUpContainer";
import Profile from "./presentational/Profile";
import NavBar from "./presentational/NavBar";
import NotificationsContainer from "./containers/NotificationsContainer";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    // Verificăm dacă utilizatorul este logat sau dacă suntem pe /login sau /signup
    if (
      !storedUser &&
      location.pathname !== "/login" &&
      location.pathname !== "/signup"
    ) {
      setUserData(null);
      navigate("/login");
    } else if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, [navigate, location.pathname]);

  const handleLogout = () => {
    setUserData(null);
  };

  return (
    <>
      {userData && (
        <NavBar
          name={userData.name}
          surname={userData.surname}
          onLogout={handleLogout}
        />
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<LoginInContainer />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<SignUpContainer />} />
        <Route path="/notifications" element={<NotificationsContainer />} />
      </Routes>
    </>
  );
}

export default App;
