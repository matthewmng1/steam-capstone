import React from "react";
import {Routes, Route, Redirect } from "react-router-dom";
import Home from "../home/Home";
import LoginForm from "../forms/LoginForm";
import SignupForm from "../forms/SignupForm";
import ProfileForm from "../forms/ProfileForm";
import AppList from "../steamapps/AppList"
import AppNews from "../steamapps/AppNews";
import Dashboard from "../userDashboard/Dashboard";

function AppRoutes({ login, signup }){
  console.debug(
    "Routes",
    `login=${typeof login}`,
    `register=${typeof register}`,
  );

  return (
    <div>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/search" element={<AppList />} />
        <Route path="/signup" element={<SignupForm signup={signup}/>} />
        <Route path="/login" element={<LoginForm login={login} />} />
        <Route path="/logout" element={<Home />} />
        <Route path="/profile" element={<ProfileForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/news/:appid" element={<AppNews />} />

      </Routes>
    </div>
)
}

export default AppRoutes;