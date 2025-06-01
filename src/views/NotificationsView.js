import React from "react";
import "react-calendar/dist/Calendar.css";

export default function NotificationsView({
  notifications,
  onAccept,
  onReject,
}) {
  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-GB");

  return (
    <div>
      <h2>Your Notifications</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>From Date</th>
            <th>To Date</th>
            <th>Status</th>
            <th colSpan={2}></th>
          </tr>
        </thead>
        <tbody>
          {notifications.map((n, index) => (
            <tr key={n._id}>
              <th scope="row">{index}</th>
              <td>{formatDate(n.bookingDetails.bookings.startDate)}</td>
              <td>{formatDate(n.bookingDetails.bookings.endDate)}</td>
              <td className="status-cell">{n.status || ""}</td>
              <td>
                <button
                  className="btn btn-success"
                  onClick={() => onAccept(n._id, n.booking._id)}
                >
                  Accept
                </button>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => onReject(n._id, n.booking._id)}
                >
                  Refuse
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
