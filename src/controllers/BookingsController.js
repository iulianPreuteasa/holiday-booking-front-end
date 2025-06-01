import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  fetchBookings,
  deleteBookingById,
  deleteBookingNotifications,
} from "../models/bookingsModel";
import BookingsView from "../views/BookingsView";
import CalendarController from "./CalendarController";
export default function BookingsController() {
  const navigate = useNavigate();
  const { user, accessToken } = useAuth();

  const [pendingDates, setPendingDates] = useState([]);
  const [acceptedDates, setAcceptedDates] = useState([]);
  const [rejectedDates, setRejectedDates] = useState([]);

  const fetchData = useCallback(
    async (userId) => {
      try {
        const data = await fetchBookings(userId, accessToken);
        const mapped = data.map((b) => ({
          bookingId: b._id,
          startDate: b.booking.startDate,
          endDate: b.booking.endDate,
          status: b.status,
        }));
        setPendingDates(mapped.filter((b) => b.status === "requested"));
        setAcceptedDates(mapped.filter((b) => b.status === "accepted"));
        setRejectedDates(mapped.filter((b) => b.status === "rejected"));
      } catch (e) {
        console.error("Error fetching:", e);
      }
    },
    [accessToken]
  );

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      fetchData(user._id);
    }
  }, [user, fetchData, navigate]);

  const handleDelete = async (bookingId) => {
    if (!window.confirm("Are you sure you want to delete this booking?"))
      return;
    try {
      await deleteBookingById(bookingId);
      await deleteBookingNotifications(bookingId);
      // refetch
      fetchData(user._id);
    } catch (e) {
      console.error("Error deleting booking:", e);
    }
  };

  return (
    <BookingsView
      pendingDates={pendingDates}
      acceptedDates={acceptedDates}
      rejectedDates={rejectedDates}
      onDelete={handleDelete}
      CalendarComponent={
        <CalendarController onBookingsUpdated={() => fetchData(user._id)} />
      }
    />
  );
}
