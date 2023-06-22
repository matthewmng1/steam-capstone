"use strict";

import React from "react";
import "./DashboardCard.css"


function DashboardCard({name, url, backgroundUrl}){
  return (
    <a href={url}>
      <li className="card" style={{backgroundImage: `url(${backgroundUrl})`, backgroundSize: 'cover'}}>
        {/* <img src={imgUrl} className="card-img"></img> */}
        <h4 className="card-title">{name}</h4>
      </li>
    </a>
  )
}

export default DashboardCard;

// For example, style={{marginRight: spacing + 'em'}} when using JSX.

// {"background-image:" + {backgroundimg}}