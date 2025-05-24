import React, { useState, useEffect } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useAuth } from "../context/AuthContext";

const CalendarContainer = ({ onBookingsUpdated }) => {
  const { user } = useAuth();
  const [date, setDate] = useState([new Date(), new Date()]);
  const [selectedOption, setSelectedOption] = useState(false);
  const [users, setUsers] = useState([]);
  const [booked, setBooked] = useState(false); // Track booking state
  const [bookingId, setBookingId] = useState();
  const userId = user._id;

  // Fetch managers (users) when the component mounts
  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchManagers();
  }, [user]);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const bookNow = async () => {
    if (!selectedOption) {
      window.confirm("You nned to choose your manager!");
      return;
    }
    try {
      const bookingResponse = await axios.post(
        "http://localhost:5000/bookings/request",
        {
          userId: userId,
          dateStart: date[0],
          dateEnd: date[1],
        }
      );

      const bookingId = bookingResponse.data.bookingId; // Get the booking ID from the response

      if (selectedOption && bookingId) {
        try {
          const notificationResponse = await axios.post(
            "http://localhost:5000/notifications/request",
            {
              user: selectedOption,
              bookingId: bookingId,
              message: "New booking request",
            }
          );
          // Show success message
          setBooked(true);
        } catch (error) {
          console.error("Error sending notification:", error);
        }
      }

      // Reset date and selected option
      setDate([new Date(), new Date()]);
      setSelectedOption(false);

      if (onBookingsUpdated) {
        onBookingsUpdated(); // Call the function passed as a prop
      }

      // Automatically reset booked state after 3 seconds
      setTimeout(() => {
        setBooked(false);
      }, 3000);
    } catch (error) {
      console.error("Error booking:", error);
    }
  };
  return (
    <div className="d-flex align-items-center justify-content-center flex-column">
      <Calendar
        className="m-3 mt-5"
        returnValue="range"
        selectRange={true}
        onChange={setDate}
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
          onChange={handleChange}
        >
          <option>Choose an option</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name} {user.surname}
            </option>
          ))}
        </select>
      </div>
      <button className="btn btn-primary m-2" onClick={bookNow}>
        Book Now
      </button>
    </div>
  );
};

export default CalendarContainer;
