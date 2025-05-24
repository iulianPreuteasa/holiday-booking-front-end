import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useEffect } from "react";
import LoginInContainer from "./containers/LoginInContainer";
import Home from "./presentational/Home";
import SignUpContainer from "./containers/SignUpContainer";
import Profile from "./presentational/Profile";
import NavBar from "./presentational/NavBar";
import NotificationsContainer from "./containers/NotificationsContainer";
import BookingsContainer from "./containers/BookingsContainer";
import { useAuth } from "./context/AuthContext";
import axios from "axios";
import ProtectedRoute from "./containers/ProtectedRoute";

function App() {
  const { setAccessToken, setUser } = useAuth();

  useEffect(() => {
    const refreshAccessToken = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/users/refresh_token",
          {
            withCredentials: true,
          }
        );
        if (res.data.accesstoken) {
          setAccessToken(res.data.accesstoken);
          setUser(res.data.user);
        }
      } catch (error) {
        setAccessToken(null);
        setUser(null);
      }
    };

    refreshAccessToken();
  }, [setAccessToken, setUser]);

  const navigate = useNavigate();
  const location = useLocation();

  const { user, logout } = useAuth();

  useEffect(() => {
    // Dacă utilizatorul nu este logat și nu suntem pe login/signup → redirect
    if (
      !user &&
      location.pathname !== "/login" &&
      location.pathname !== "/signup"
    ) {
      navigate("/login");
    }
  }, [user, location.pathname, navigate]);

  return (
    <>
      {user && (
        <NavBar name={user.name} surname={user.surname} onLogout={logout} />
      )}

      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <NotificationsContainer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookings"
          element={
            <ProtectedRoute>
              <BookingsContainer />
            </ProtectedRoute>
          }
        />
        {/* unprotected routes */}
        <Route path="/signup" element={<SignUpContainer />} />
        <Route path="/login" element={<LoginInContainer />} />
      </Routes>
    </>
  );
}

export default App;
