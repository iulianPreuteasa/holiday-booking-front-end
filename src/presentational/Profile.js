import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CalendarContainer from "../containers/CalendarContainer";

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    surname: "",
    acceptat: [],
    asteptare: [],
    respins: [],
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    } else {
      navigate("/login"); // Redirecționează la login dacă nu există date
    }
  }, [navigate]);

  return (
    <div className="d-flex justify-content-center align-item-center w-100 vh-100">
      <div className="w-100">
        <div className="calendar-container">
          <div className="calendar-show">
            <CalendarContainer />
          </div>
        </div>
        <div className="d-flex flex-column align-items-center justify-content-center m-3 ">
          <div className="m-2">Perioada acceptata: {userData.acceptat}</div>
          <div className="m-2">Perioada in asteptare: {userData.asteptare}</div>
          <div className="m-2">Perioada respinsa: {userData.respins}</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
