import axios from "axios";

export const getUsers = async () => {
  const users = await axios.get("http://localhost:5000/users");
  return users.data;
};

export const updateUsersRoles = async (users) => {
  return await axios.put("http://localhost:5000/users/updateroles", users);
};
