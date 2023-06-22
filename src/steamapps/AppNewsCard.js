import React from "react";
import "./AppNewsCard.css"

function AppNewsCard({ gid, title, url, author}){
  if({gid} === undefined){
    return (
      <p>Nothing to see here</p>
    )
  }

  return(
    <a href={url} target="_blank" className="appnewscard-link">
      <li className="appnewscard">
          <div className="appnewscard-content">
            <h4>{title}</h4>
            <p><small>Author: {author}</small></p>
          </div>
      </li>
    </a>
  )
}

export default AppNewsCard;