import { Routes, Route } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import ProtectedRoute from "../controllers/ProtectedRoute";
import { useAuth } from "../context/AuthContext";
import BookingsController from "../controllers/BookingsController";
import LoginController from "../controllers/LoginController";
import SignUpController from "../controllers/SignUpController";
import NotificationsController from "../controllers/NotificationsController";
import NavBarController from "../controllers/NavBarController";
import HomeController from "../controllers/HomeController";
import React from "react";
import AdminController from "../controllers/AdminController";

export default function AppView({ onLogout }) {
  const { user } = useAuth();

  return (
    <>
      {user && <NavBarController />}

      <Routes>
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomeController />
            </ProtectedRoute>
          }
        />

        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <NotificationsController />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookings"
          element={
            <ProtectedRoute>
              <BookingsController />
            </ProtectedRoute>
          }
        />

        {/* unprotected routes */}
        <Route path="/signup" element={<SignUpController />} />
        <Route path="/login" element={<LoginController />} />

        {/* Admin page */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminController />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}
