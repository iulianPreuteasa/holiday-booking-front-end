import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getManagers,
  sendBookingRequest,
  sendNotification,
} from "../models/calendarModel";
import CalendarView from "../views/CalendarView";

export default function CalendarController({ onBookingsUpdated }) {
  const { user } = useAuth();
  const [date, setDate] = useState([new Date(), new Date()]);
  const [selectedOption, setSelectedOption] = useState("");
  const [users, setUsers] = useState([]);
  const [booked, setBooked] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await getManagers();
        setUsers(result);
      } catch (e) {
        console.error("Could not load managers:", e);
      }
    };
    fetch();
  }, []);

  const handleBooking = async () => {
    if (!selectedOption) {
      window.alert("You need to choose your manager!");
      return;
    }

    try {
      const bookingId = await sendBookingRequest(user._id, date[0], date[1]);
      await sendNotification(selectedOption, bookingId);

      setBooked(true);
      setDate([new Date(), new Date()]);
      setSelectedOption("");

      if (onBookingsUpdated) onBookingsUpdated();

      setTimeout(() => setBooked(false), 3000);
    } catch (e) {
      console.error("Booking failed:", e);
    }
  };

  return (
    <CalendarView
      date={date}
      onDateChange={setDate}
      selectedOption={selectedOption}
      onOptionChange={(e) => setSelectedOption(e.target.value)}
      users={users}
      onBook={handleBooking}
      booked={booked}
    />
  );
}
