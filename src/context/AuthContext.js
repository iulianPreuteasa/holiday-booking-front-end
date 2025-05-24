import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/users/refresh_token",
          { withCredentials: true }
        );
      } catch (err) {
        console.error("Token refresh failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAccessToken();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/users/login",
        { email, password },
        { withCredentials: true } // trimite și primește cookie-ul httpOnly
      );

      setAccessToken(res.data.accesstoken);
      setUser(res.data.user);
    } catch (err) {
      console.error("Login error:", err);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/users/logout",
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setAccessToken(null);
      setUser(null);
    }
  };

  const getAccessToken = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/users/refresh_token",
        {},
        { withCredentials: true }
      );
      setAccessToken(res.data.accesstoken);
      return res.data.accesstoken;
    } catch (err) {
      console.error("Error refreshing token:", err);
      setAccessToken(null);
      return null;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
        user,
        setUser,
        login,
        logout,
        getAccessToken,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
