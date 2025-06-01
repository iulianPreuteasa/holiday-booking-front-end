import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { refreshAccessToken } from "../models/authModel";
import AppView from "../views/AppView";

export default function AppController() {
  const { setAccessToken, setUser, user, loading, logout } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchToken = async () => {
      const data = await refreshAccessToken();
      setAccessToken(data.accesstoken);
      setUser(data.user);
    };

    fetchToken();
  }, [setAccessToken, setUser]);

  useEffect(() => {
    if (
      !loading &&
      !user &&
      location.pathname !== "/login" &&
      location.pathname !== "/signup"
    ) {
      navigate("/login");
    }
  }, [user, loading, location.pathname, navigate]);

  return <AppView onLogout={logout} />;
}
