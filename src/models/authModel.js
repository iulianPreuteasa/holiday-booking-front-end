import axios from "axios";

export const refreshAccessToken = async () => {
  try {
    const res = await axios.post(
      "http://localhost:5000/users/refresh_token",
      {},
      { withCredentials: true }
    );
    return res.data;
  } catch (error) {
    return { accesstoken: null, user: null };
  }
};

export const signUpUser = async ({ name, surname, email, password }) => {
  const response = await axios.post("http://localhost:5000/users/signup", {
    name,
    surname,
    email,
    password,
  });
  return response.data;
};
