import axios from "axios";
export const fetchNotifications = async (userId) => {
  const response = await axios.get(
    `http://localhost:5000/notifications?userId=${userId}`
  );
  return response.data;
};

export const acceptBookingRequest = async (bookingId, notificationId) => {
  return await axios.patch(`http://localhost:5000/bookings/request/accepted`, {
    bookingId,
    notificationId,
  });
};

export const rejectBookingRequest = async (bookingId, notificationId) => {
  return await axios.patch(`http://localhost:5000/bookings/request/rejected`, {
    bookingId,
    notificationId,
  });
};
