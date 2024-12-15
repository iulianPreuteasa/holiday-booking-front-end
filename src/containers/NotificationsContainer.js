import React, { useState, useEffect } from "react";
import axios from "axios";

const NotificationsContainer = () => {
  const [notifications, setNotifications] = useState([]);
  const userId = JSON.parse(localStorage.getItem("user")).userId;

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Facem cererea GET pentru a obține notificările și booking-urile asociate
        const response = await axios.get(
          `http://localhost:5000/notifications?userId=${userId}` // Parametrul userId în query
        );

        // Setăm notificările în state
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

  return (
    <div>
      <h2>Your Notifications</h2>
      {notifications.length > 0 ? (
        <ul>
          {notifications.map((notification) => (
            <li key={notification._id}>
              <p>{notification.message}</p>
              {notification.bookingDetails.requestDates.length > 0 ? (
                <ul className="list-group">
                  {notification.bookingDetails.requestDates.map(
                    (range, index) => (
                      <li className="list-group-item" key={index}>
                        {`${formatDate(
                          range.startDate
                        ).toLocaleString()} - ${formatDate(
                          range.endDate
                        ).toLocaleString()}`}
                        <button className="btn btn-primary m-2">ACCEPT</button>
                        <button className="btn btn-danger">REJECT</button>
                      </li>
                    )
                  )}
                </ul>
              ) : (
                <p>No request dates available</p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No notifications available</p>
      )}
    </div>
  );
};

export default NotificationsContainer;
