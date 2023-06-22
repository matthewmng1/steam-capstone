import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import "./AppListCard.css"

function AppListCard({ appid, name, imgUrl, backgroundUrl, developers, short_description  }){
  const [backgroundError, setBackgroundError] = useState(false);


  useEffect(() => {
    const img = new Image();
    img.src = backgroundUrl;

    const handleImageError = () => {
      setBackgroundError(true);
    };

    img.addEventListener("error", handleImageError);

    return () => {
      img.removeEventListener("error", handleImageError);
    };
  }, [backgroundUrl]);

  return (
    <Link to={`/news/${appid}`} className="applistcard-link">
      <li className="applistcard">
        <div className="applistcard-content">
          <h4>{name}</h4>
        </div>
        
      </li>
    </Link>
  )
}

export default AppListCard;

// {{backgroundImage: `url(${backgroundUrl})`, backgroundSize: 'cover'}}