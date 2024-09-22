import { Routes, Route } from "react-router-dom";
import React from "react";
import LoginInContainer from "./containers/LoginInContainer";
import Home from "./presentational/Home";
import ProfileContainer from "./containers/ProfileContainer";
import SignUpContainer from "./containers/SignUpContainer";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginInContainer />} />
        <Route path="/profile" element={<ProfileContainer />} />
        <Route path="/signup" element={<SignUpContainer />} />
      </Routes>
    </>
  );
}

export default App;
