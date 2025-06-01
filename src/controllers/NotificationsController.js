import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  fetchNotifications,
  acceptBookingRequest,
  rejectBookingRequest,
} from "../models/notificationsModel";
import NotificationsView from "../views/NotificationsView";

export default function NotificationsController() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);

  const userId = user._id;

  useEffect(() => {
    if (!userId) return;
    const loadNotifications = async () => {
      try {
        const data = await fetchNotifications(userId);
        setNotifications(data);
      } catch (e) {
        console.error("Error fetching notifications:", e);
      }
    };

    loadNotifications();
  }, [userId]);

  const handleAccept = async (notificationId, bookingId) => {
    try {
      await acceptBookingRequest(bookingId, notificationId);
      setNotifications((prev) => prev.filter((n) => n._id !== notificationId));
    } catch (e) {
      console.error("Error accepting booking:", e);
    }
  };

  const handleReject = async (notificationId, bookingId) => {
    try {
      await rejectBookingRequest(bookingId, notificationId);
      setNotifications((prev) => prev.filter((n) => n._id !== notificationId));
    } catch (e) {
      console.error("Error rejecting booking:", e);
    }
  };

  return (
    <NotificationsView
      notifications={notifications}
      onAccept={handleAccept}
      onReject={handleReject}
    />
  );
}
