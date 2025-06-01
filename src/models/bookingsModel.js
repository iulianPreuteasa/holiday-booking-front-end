import axios from "axios";

// fetching bookings
export const fetchBookings = async (userId, accessToken) => {
  const response = await axios.get("http://localhost:5000/bookings", {
    params: { userId },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  });

  return response.data;
};

// delete booking notification
export const deleteBookingNotifications = async (bookingId) => {
  return await axios.delete(
    `http://localhost:5000/notifications/delete/${bookingId}`
  );
};

//delete booking by id
export const deleteBookingById = async (bookingId) => {
  return await axios.delete(
    `http://localhost:5000/bookings/delete/${bookingId}`
  );
};
