import React from "react";

export default function BookingsView({
  pendingDates,
  acceptedDates,
  rejectedDates,
  onDelete,
  CalendarComponent,
}) {
  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-GB");

  const renderList = (title, dates) => (
    <div className="m-2">
      <p>{title}</p>
      <ul>
        {dates.map((date) => (
          <li key={date.bookingId} data-booking-id={date.bookingId}>
            {formatDate(date.startDate)} - {formatDate(date.endDate)}
            <span className="m-2" onClick={() => onDelete(date.bookingId)}>
              <i className="bi bi-trash"></i>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="d-flex justify-content-center align-item-center w-100 vh-100">
      <div className="w-100">
        <div className="calendar-container">
          <div className="calendar-show">{CalendarComponent}</div>
        </div>
        <div className="d-flex flex-column align-items-center justify-content-center m-3">
          {renderList("Perioada in asteptare:", pendingDates)}
          {renderList("Perioada acceptata:", acceptedDates)}
          {renderList("Perioada respinsa:", rejectedDates)}
        </div>
      </div>
    </div>
  );
}
