import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CalendarContainer from "../containers/CalendarContainer";

const Profile = ({ name, surname, acceptat, asteptare, respins }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!name) {
      navigate("/login");
    }
  }, [name, navigate]);

  const logout = () => {
    navigate("/login");
  };

  return (
    <div className="d-flex justify-content-center align-item-center w-100 vh-100">
      <div className="w-100">
        <div className="container-fluide p-3 border-bottom border-primary rounded d-flex justify-content-between">
          <p>
            {name ? `Welcome, ${name} ${surname}!` : "No user data available"}
          </p>
          <button onClick={logout} className="btn btn-primary ">
            Log Out
          </button>
        </div>
        <div className="calendar-container">
          <div className="calendar-show">
            <CalendarContainer />
          </div>
        </div>
        <div className="d-flex flex-column align-items-center justify-content-center m-3 ">
          <div className="m-2">Perioada acceptata: {acceptat}</div>
          <div className="m-2">Perioada in asteptare: {asteptare}</div>
          <div className="m-2">Perioada respinsa: {respins}</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
