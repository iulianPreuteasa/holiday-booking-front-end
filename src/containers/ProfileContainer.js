import React from "react";
import { useLocation } from "react-router-dom";
import Profile from "../presentational/Profile";

const ProfileContainer = () => {
  const location = useLocation();
  const { name, surname, acceptat, respins, asteptare } = location.state || {};
  return (
    <Profile
      name={name}
      surname={surname}
      acceptat={acceptat}
      respins={respins}
      asteptare={asteptare}
    />
  );
};

export default ProfileContainer;
