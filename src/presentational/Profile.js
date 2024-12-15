import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CalendarContainer from "../containers/CalendarContainer";
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();

  const [pendingDates, setPendingDates] = useState([]);
  const [acceptedDates, setAcceptedDates] = useState([]);
  const [rejectedDates, setRejectedDates] = useState([]);
  const [userId, setUserId] = useState(null);

  // On component mount, get the user ID from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const userObj = JSON.parse(storedUser);
        setUserId(userObj.userId);
      } catch (error) {
        console.error("Error parsing stored user data:", error);
      }
    } else {
      navigate("/login"); // Redirect to login if user data is not found
    }
  }, [navigate]);

  // Fetch bookings for the logged-in user
  useEffect(() => {
    if (userId) {
      fetchBookings();
    }
  }, [userId]); // Only call fetchBookings when userId changes

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB"); // Format: DD/MM/YYYY
  };

  const fetchBookings = async () => {
    if (!userId) return;
    try {
      const response = await axios.get("http://localhost:5000/bookings", {
        params: { userId }, // Pass userId as a query parameter
      });

      const bookings = response.data;

      // If no bookings are returned, reset the dates arrays
      if (!bookings.length) {
        setPendingDates([]);
        setAcceptedDates([]);
        setRejectedDates([]);
        return;
      }

      // Map the bookings into categorized arrays
      const pending = bookings.flatMap((booking) =>
        booking.requestDates.map((date) => ({
          bookingId: booking._id,
          startDate: date.startDate,
          endDate: date.endDate,
        }))
      );

      const accepted = bookings.flatMap((booking) =>
        booking.acceptedDates.map((date) => ({
          bookingId: booking._id,
          startDate: date.startDate,
          endDate: date.endDate,
        }))
      );

      const rejected = bookings.flatMap((booking) =>
        booking.rejectedDates.map((date) => ({
          bookingId: booking._id,
          startDate: date.startDate,
          endDate: date.endDate,
        }))
      );

      setPendingDates(pending);
      setAcceptedDates(accepted);
      setRejectedDates(rejected);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };
  const deleteBookingNotifications = async (bookingId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/notifications/delete/${bookingId}`
      );
      // Actualizează UI-ul după ștergere
      fetchBookings(); // O funcție care reîncarcă rezervările curente
    } catch (error) {
      console.error("Error deleting notifications:", error);
    }
  };

  const deleteBooking = async (e) => {
    const toDelete = e.target.closest("li");
    const bookingId = toDelete.getAttribute("data-booking-id");
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this booking?"
    );
    if (confirmDelete) {
      try {
        // Send delete request
        const response = await axios.delete(
          `http://localhost:5000/bookings/delete/${bookingId}`
        );
        deleteBookingNotifications(bookingId);

        // Remove the deleted booking from the UI by updating the state
        setPendingDates((prev) =>
          prev.filter((date) => date.bookingId !== bookingId)
        );
        setAcceptedDates((prev) =>
          prev.filter((date) => date.bookingId !== bookingId)
        );
        setRejectedDates((prev) =>
          prev.filter((date) => date.bookingId !== bookingId)
        );
      } catch (error) {
        console.error("Error deleting booking:", error);
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-item-center w-100 vh-100">
      <div className="w-100">
        <div className="calendar-container">
          <div className="calendar-show">
            <CalendarContainer
              onBookingsUpdated={() => fetchBookings(userId)}
            />
          </div>
        </div>
        <div className="d-flex flex-column align-items-center justify-content-center m-3">
          <div className="m-2">
            <p>Perioada in asteptare: </p>
            <ul>
              {pendingDates.map((date) => (
                <li key={date.bookingId} data-booking-id={date.bookingId}>
                  {formatDate(date.startDate)} - {formatDate(date.endDate)}
                  <span className="m-2" onClick={deleteBooking}>
                    <i className="bi bi-trash"></i>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="m-2">
            <p>Perioada acceptata: </p>
            <ul>
              {acceptedDates.map((date) => (
                <li key={date.bookingId} data-booking-id={date.bookingId}>
                  {formatDate(date.startDate)} - {formatDate(date.endDate)}
                  <span className="m-2" onClick={deleteBooking}>
                    <i className="bi bi-trash"></i>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="m-2">
            <p>Perioada respinsa: </p>
            <ul>
              {rejectedDates.map((date) => (
                <li key={date.bookingId} data-booking-id={date.bookingId}>
                  {formatDate(date.startDate)} - {formatDate(date.endDate)}
                  <span className="m-2" onClick={deleteBooking}>
                    <i className="bi bi-trash"></i>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
