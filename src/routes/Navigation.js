import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../auth/UserContext";
import steamlogo from "../images/steam_logo.svg"
import "./Navigation.css";

function Navigation ({ logout }){
  const { currentUser } = useContext(UserContext);
  console.debug("Navigation", "currentUser=", currentUser);

  function loggedInNav(){
    return (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item mr-4">
          <NavLink className="nav-link" to="/">
            Home
          </NavLink>
          </li>
          <li className="nav-item mr-4">
            <NavLink className="nav-link" to="/profile">
            {currentUser.username}
          </NavLink>
          </li>
          <li className="nav-item mr-4">
            <NavLink className="nav-link" to="/dashboard">
              Dashboard
            </NavLink>
          </li>
          <li className="nav-item mr-4">
            <NavLink className="nav-link" to="/search">
              Search
            </NavLink>
          </li>
          <li className="nav-item mr-4">
            <NavLink className="nav-link" to="/logout" onClick={logout}>
            Log out
          </NavLink>
          </li>
          
        
      </ul>
    )
  }

  function loggedOutNav(){
    return (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item mr-4">
          <NavLink className="nav-link" to="/login">
            Login
          </NavLink>
        </li>
        <li className="nav-item mr-4">
          <NavLink className="nav-link" to="/signup">
            Signup
          </NavLink>
        </li>
      </ul>
    )
  }

  return (
    <nav className="Navigation navbar navbar-expand-md">
      <Link className="navbar-brand" to="/">
        <img src={steamlogo}></img>
      </Link>
      {currentUser ? loggedInNav() : loggedOutNav()}
    </nav>
  )
}

export default Navigation;