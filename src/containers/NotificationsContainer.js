import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-calendar/dist/Calendar.css";

const NotificationsContainer = () => {
  const [notifications, setNotifications] = useState([]);
  const userId = JSON.parse(localStorage.getItem("user")).userId;

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/notifications?userId=${userId}`
        );

        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, [userId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB"); // Format: DD/MM/YYYY
  };

  const acceptBooking = async (e) => {
    let targetBooking = e.target.closest("tr");
    const button = targetBooking.querySelector(".btn-success");

    button.disabled = true;
    const bookingId = targetBooking.getAttribute("data-key");
    const notificationId = targetBooking.getAttribute("data-notification");

    try {
      const response = await axios.patch(
        `http://localhost:5000/bookings/request/accepted`,
        { bookingId, notificationId }
      );

      const statusCell = targetBooking.querySelector(".status-cell");
      if (statusCell) {
        statusCell.textContent = "Accepted";
      } else {
        targetBooking.textContent = "Your booking was accepted!";
      }
      setTimeout(() => {
        targetBooking.remove();
      }, 3000);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const rejectBooking = async (e) => {
    let targetBooking = e.target.closest("tr");
    const button = targetBooking.querySelector(".btn-danger");

    button.disabled = true;
    const bookingId = targetBooking.getAttribute("data-key");
    const notificationId = targetBooking.getAttribute("data-notification");

    try {
      const response = await axios.patch(
        `http://localhost:5000/bookings/request/rejected`,
        { bookingId, notificationId }
      );

      const statusCell = targetBooking.querySelector(".status-cell");
      if (statusCell) {
        statusCell.textContent = "Rejected";
      } else {
        targetBooking.textContent = "Your booking was Rejected!";
      }

      setTimeout(() => {
        targetBooking.remove();
      }, 3000);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };
  return (
    <div>
      <h2>Your Notifications</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">From Date</th>
            <th scope="col">To Date</th>
            <th scope="col">Status Cell</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {notifications.map((notification, index) => (
            <tr
              key={notification._id}
              data-notification={notification._id}
              data-key={notification.booking._id}
            >
              <th scope="row">{index}</th>
              <td>{`${formatDate(
                notification.bookingDetails.bookings.startDate
              )}`}</td>
              <td>{`${formatDate(
                notification.bookingDetails.bookings.endDate
              )}`}</td>
              <td className="status-cell"></td>
              <td>
                <button onClick={acceptBooking} className="btn btn-success">
                  Accept
                </button>
              </td>
              <td>
                {" "}
                <button onClick={rejectBooking} className="btn btn-danger">
                  Refuse
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NotificationsContainer;
