import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <p>
        If you are not in a group you need to ask for an invitation from your
        manager and he will add you to his group!
      </p>
      <button
        className="btn btn-primary"
        onClick={() => navigate("/notifications")}
      >
        Notifications
      </button>
    </div>
  );
};

export default Home;
