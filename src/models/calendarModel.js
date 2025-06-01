import axios from "axios";

export const getManagers = async () => {
  const res = await axios.get("http://localhost:5000/users");
  return res.data;
};

export const sendBookingRequest = async (userId, dateStart, dateEnd) => {
  const res = await axios.post("http://localhost:5000/bookings/request", {
    userId,
    dateStart,
    dateEnd,
  });

  return res.data.bookingId;
};

export const sendNotification = async (managerId, bookingId) => {
  return await axios.post("http://localhost:5000/notifications/request", {
    user: managerId,
    bookingId,
    message: "New booking request",
  });
};
