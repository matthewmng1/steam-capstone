import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";
import Routes from "./routes/Routes"
import Navigation from "./routes/Navigation";
import SteamDbApi from "./api/api";
import UserContext from "./auth/UserContext";
import jwt from "jsonwebtoken"
import "./App.css"

export const TOKEN_STORAGE_ID = "steamdb-token";

function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(null)
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  console.debug(
    "App",
    "currentUser=", currentUser,
    "token=", token,
  );

  useEffect(function loadUserInfo() {
    console.debug("App useEffect loadUserInfo", "token=", token);

    async function getCurrentUser(){
      if(token){
        try{
          let{ username } = jwt.decode(token)
          SteamDbApi.token = token;
          let currentUser = await SteamDbApi.getCurrentUser(username)
          setCurrentUser(currentUser);
        } catch (e) {
          console.error("App loadUserInfo: problem loading", e);
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    }
    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

  async function signup(signupData){
    try{
      let token = await SteamDbApi.signup(signupData);
      setToken(token)
      return {success: true };
    } catch(e){
      console.error("signup failed", e);
      return {success: false, e};
    }
  }

  async function login(loginData){
    try{
      let token = await SteamDbApi.login(loginData);
      setToken(token)
      return {success:true};
    }catch(e){
      console.error("login failed", e);
      return {success: false, e};
    }
  }

  function logout() {
    setCurrentUser(null);
    setToken(null);
    localStorage.removeItem("searchedAppData");
    localStorage.removeItem("searchTerm")

  }

  
  if(!infoLoaded) return;

  return (
    <BrowserRouter>
        <UserContext.Provider
            value={{ currentUser, setCurrentUser}}>
          <div className="App">
            <Navigation logout={logout} />
            <Routes login={login} signup={signup}/>
          </div>
          </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;