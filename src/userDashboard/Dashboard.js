import React, { useContext, useEffect, useState } from "react";
import SteamDbApi from "../api/api";
import UserContext from "../auth/UserContext";
import DashboardCard from "./DashboardCard";
import "./Dashboard.css"

function Dashboard() {
  const { currentUser } = useContext(UserContext);
  const username = currentUser.username;
  const userid = currentUser.id;

  const [appData, setAppData] = useState([]);

  useEffect(() => {
    async function getDashApps(userid) {
      try {
        const res = await SteamDbApi.getDashboardApps(userid);
        setAppData(res.apps)
      } catch (e) {
        throw new Error(e);
      }
    }

    getDashApps(userid);
  }, [userid]);

  console.log(appData); 

  return (
    <div className="dashboard">
      <h1>{username}'s Dashboard</h1>
      <ul className="dashboard-grid">
        {appData.map((a) => (
          <DashboardCard
            key={a.ids}
            url={a.url}
            name={a.name}
            backgroundUrl={a.backgroundimageurl}
          />
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;