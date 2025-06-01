import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function CalendarView({
  date,
  onDateChange,
  selectedOption,
  onOptionChange,
  users,
  onBook,
  booked,
}) {
  return (
    <div className="d-flex align-items-center justify-content-center flex-column">
      <Calendar
        className="m-3 mt-5"
        returnValue="range"
        selectRange={true}
        onChange={onDateChange}
        value={date}
        minDate={new Date()}
      />
      {/* Success Message */}
      {booked && (
        <div className="alert alert-success mt-3">
          Your booking was successful!
        </div>
      )}
      <div className="m-2">
        Your choice: {date[0].toLocaleDateString()} -{" "}
        {date[1].toLocaleDateString()}
      </div>
      <div>
        <label htmlFor="options">Choose your Manager:</label>
        <select
          className="form-select"
          id="options"
          value={selectedOption}
          onChange={onOptionChange}
        >
          <option>Choose an option</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name} {user.surname}
            </option>
          ))}
        </select>
      </div>
      <button className="btn btn-primary m-2" onClick={onBook}>
        Book Now
      </button>
    </div>
  );
}
