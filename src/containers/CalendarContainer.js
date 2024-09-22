import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CalendarContainer = () => {
  const [date, setDate] = useState([new Date(), new Date()]);
  let dateStart = date[0].toLocaleDateString();
  let dateEnd = date[1].toLocaleDateString();

  const bookNow = () => {
    alert(`Booked for the period of ${dateStart} - ${dateEnd}`);
  };
  return (
    <>
      <div className="d-flex align-items-center justify-content-center flex-column">
        <Calendar
          className="m-3 mt-5"
          returnValue="range"
          selectRange={true}
          onChange={setDate}
          value={date}
          minDate={new Date()}
        />
        <div className="m-2">
          Your choice: {dateStart} - {dateEnd}
        </div>
        <button className="btn btn-primary m-2" onClick={bookNow}>
          Book Now
        </button>
      </div>
    </>
  );
};

export default CalendarContainer;
