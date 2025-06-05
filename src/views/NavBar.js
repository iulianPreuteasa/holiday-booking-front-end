import React from "react";

export default function NavBar({ name, surname, onLogout, navigateTo }) {
  return (
    <div className="container-fluide p-3 border-bottom border-primary rounded d-flex justify-content-between">
      <p>{name ? `Welcome, ${name} ${surname}!` : "No user data available"}</p>
      <div>
        {/* for dev only  */}
        <button className="btn btn-danger" onClick={() => navigateTo("/admin")}>
          ADMIN
        </button>
        {/* for dev only  */}
        <button
          className="btn btn-primary m-2"
          onClick={() => navigateTo("/home")}
        >
          Home
        </button>
        <button
          className="btn btn-primary m-2"
          onClick={() => navigateTo("/bookings")}
        >
          Bookings
        </button>
        <button
          className="btn btn-primary"
          onClick={() => navigateTo("/notifications")}
        >
          Notifications
        </button>
        <button onClick={onLogout} className="btn btn-primary m-2">
          Log Out
        </button>
      </div>
    </div>
  );
}
