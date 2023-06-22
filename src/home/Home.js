import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../auth/UserContext";
import steam_homelogo from "../images/steam_bluelogo.png"
import "./Home.css"

function Home(){
  const {currentUser} = useContext(UserContext);
  return (
    <div className="Home">
      <div className="container text-center">
        {currentUser
          ? <h2>
            Welcome back, {currentUser.firstName || currentUser.username}!
          </h2> : 
          <div></div>
          // (
          //   <div>
          //     <ul className="logout-container">
          //       <li className="button-container">
          //         <Link to="/login">
          //           <button className="button">
          //             Login
          //           </button>
          //         </Link>
          //       </li>
          //       <li className="button-container">
          //         <Link to="/signup">
          //           <button className="button">
          //             Signup
          //           </button>
          //         </Link>
          //     </li>
          //     </ul>
          //   </div>
          // )
          }
      </div>
    </div>
  )
}

export default Home;