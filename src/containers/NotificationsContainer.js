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

  const acceptBooking = (e) => {
    let targetBooking = e.target.closest("li");
    targetBooking.textContent = "Your booking was accepted!";
    // pe partea de front-end
    // atunci cand apas pe accept am nevoie sa arate un mesaj in care sa spuna ca bookingul a fost acceptat

    //  pe partea de back-end trebuie ca sa se mute bookingul de la request  la accept
  };

  const rejectBooking = (e) => {
    let targetBooking = e.target.closest("li");
    targetBooking.textContent = " Your booking was rejected!";
    // pe partea de front-end
    // atunci cand apas pe accept am nevoie sa arate un mesaj in care sa spuna ca bookingul a fost rejectat

    //  pe partea de back-end trebuie ca sa se mute bookingul de la request reject
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
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {notifications.map((notification, index) => (
            <tr key={notification._id}>
              <th scope="row">{index}</th>
              <td>{`${formatDate(
                notification.bookingDetails.bookings.startDate
              )}`}</td>
              <td>{`${formatDate(
                notification.bookingDetails.bookings.endDate
              )}`}</td>
              <td>
                <button className="btn btn-success">Accept</button>
              </td>
              <td>
                {" "}
                <button className="btn btn-danger">Refuse</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <li key={notification._id}>
        <p>{notification.message}</p>
        <p key={`${notification._id}-${index}`} className="pst-group-item">
          {`${formatDate(
            notification.bookingDetails.bookings.startDate
          )} - ${formatDate(notification.bookingDetails.bookings.endDate)}`}
        </p>
      </li> */}
    </div>
  );
};

export default NotificationsContainer;
