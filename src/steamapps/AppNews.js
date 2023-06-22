import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import SteamDbApi from "../api/api";
import AppNewsCard from "./AppNewsCard";
import UserContext from "../auth/UserContext";
import "./AppNews.css"


function AppNews(){
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const {appid} = useParams();
  let userid = currentUser.id;
  console.debug("AppNews")

  const [news, setNews] = useState(null)
  const [buttonState, setButtonState] = useState(false)

  const [name, setName] = useState("")
  const [url, setUrl] = useState("")
  const [backgroundImageUrl, setBackgroundImageUrl] = useState("")
  const [imgUrl, setImgUrl] = useState("")

  useEffect(function getAppNewsItems(){
    async function getNews(){
      let res = await SteamDbApi.getAppNews(appid)
      setNews(res.news);
    }
    getNews();
  }, [appid])

  useEffect(() => {
    async function checkDb(){
      let data = {appid: parseInt(appid), userid}
      let res = await SteamDbApi.getFavoritedApps()
      let found = res.find((favorite) => {
        return favorite.appid === data.appid && favorite.userid === data.userid;
      })
      if(found) return setButtonState(true)
    }
    checkDb();
  }, [])

  useEffect(() => {
    async function getAppDetails(){
      let data = await SteamDbApi.getAppDetails(appid)
      setName(data.name)
      setUrl(`/news/${appid}`)
      setImgUrl(data.header_image)
      setBackgroundImageUrl(data.backgroundImageUrl)
    }
    getAppDetails();
  }, [])

  // onclick (to add), also post data to favorites table
  // onclick (to remove), also remove data from favorites table

  async function btnClick(){
    let btndata = {appid, userid, name, url, backgroundImageUrl}
    try{
      if(buttonState === false){
        let res = await SteamDbApi.addAppToDash(appid, btndata)
        setButtonState(true)
      }
      if(buttonState === true){
        let res = await SteamDbApi.removeAppFromDash(appid, btndata)
        setButtonState(false)
      }
    }catch (e){
      throw new Error(e)
    }
  }

  if(!news) return;

  return(
    <div className="appnews">
      <div className="appnews-header">
      <img className="appnews-img" src={imgUrl}></img>
        <div className="btn-container">
          <button 
            className="dash-button"
            onClick={btnClick}>
          {!buttonState ? "Add to Dash" : "Remove from Dash" }
          </button>
        </div>
      </div>
      <div className="appnews-container">
        {news.length 
          ? (
            <ul className="appnews-list">
              {news.map(n => (
                <AppNewsCard
                    key={n.gid}
                    title={n.title}
                    url={n.url}
                    author={n.author}
                />
                ))}
            </ul>
          ) : 
            <p>No recent news</p>}
          </div>
        <div>
      </div>
    </div>
  )
}

export default AppNews;