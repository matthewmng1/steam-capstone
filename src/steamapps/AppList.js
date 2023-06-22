import React, { useEffect, useState } from "react";
import SteamDbApi from "../api/api";
import SearchAppsForm from "../forms/SearchAppsForm";
import AppListCard from "./AppListCard";
import useLocalStorageForSearch from "../hooks/useLocalStorage";
import "./AppList.css"

function AppsList() {
  console.debug("AppList");

  const [appData, setAppData] = useState([])
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(null);
  const [localData, setLocalData] = useLocalStorageForSearch("searchedAppData", [])

  useEffect(() => {
    if(localData.length > 0) {
      setAppData(JSON.parse(localData));
      setSearched(true);
    }
  }, [localData]);

  async function search(name){
    // const data = []
    try {
      let appNames = await SteamDbApi.getAppNames(name);
      const data = Object.values(appNames.data).map((item) => ({
        appid: item.appid,
        name: item.name
      }))
      setAppData(data);
      setLocalData(JSON.stringify(data))
      setLoading(true)
      // for(let idx in appNames.data){
      //   data.push(appNames.data[idx])
      // }
      setSearched(true)
      setLoading(false)
    }catch(e){
      throw new Error(e)
    }
  }

  if (!searched) {
    return (
      <div>
        <SearchAppsForm searchFor={search} />
      </div>
    );
  }

  return (
    <div className="applist">
      <SearchAppsForm searchFor={search} />
      {loading ? (
        <p className="lead">Searching...</p>
      ) : (
        searched ? (
          <div className="applist-container">
            <ul className="applist-list">
              {appData.length > 0 ? (
                appData.map((a) => (
                  <AppListCard
                    key={a.appid}
                    appid={a.appid}
                    name={a.name}
                  />
                ))
              ) : (
                <p className="lead">Sorry, no results were found!</p>
              )}
            </ul>
          </div>
        ) : null
      )}
    </div>
  );
}

export default AppsList;
