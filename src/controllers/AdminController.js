import React, { useEffect, useState } from "react";
import AdminView from "../views/AdminView";
import { getUsers, updateUsersRoles } from "../models/adminModel";

export default function AdminController() {
  const [users, setUsers] = useState([]);
  const [modifiedUsers, setModifiedUsers] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getUsers();
      setUsers(users);
    };
    fetchUsers();
  }, []);

  const handleRoleChange = (userId, newRole) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, role: newRole } : user
      )
    );
    // daca am 3 useri modificati deja, iulian , comsin , daniel
    setModifiedUsers((prev) => {
      const alreadyModified = prev.find((u) => u.id === userId);
      if (alreadyModified) {
        return prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u));
      } else {
        const originalUser = users.find((u) => u.id === userId);
        return [...prev, { ...originalUser, role: newRole }];
      }
    });
  };

  const handleSaveChanges = async () => {
    if (modifiedUsers.length < 1) return;
    try {
      const result = await updateUsersRoles(modifiedUsers);
      setMessage(result.data.message);
      setTimeout(() => {
        setMessage("");
      }, 5000);
    } catch (error) {
      setMessage("An error has occured");
      setTimeout(() => setMessage(""), 5000);
    }
  };

  return (
    <AdminView
      users={users}
      onRoleChange={handleRoleChange}
      onSave={handleSaveChanges}
      message={message}
    />
  );
}
