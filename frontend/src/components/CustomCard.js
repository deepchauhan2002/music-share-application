import React, { useState } from "react";
import "./CustomCard.css";

const CustomCard = ({ trackName, artistName, albumArt }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="song-card">
      <div
        className="song-card-image"
        style={{ backgroundImage: `url(${albumArt})` }}
      >
        <div className="song-card-details">
          <h3 className="song-card-title">{trackName}</h3>
          <p className="song-card-artist">{artistName}</p>
        </div>
      </div>
    </div>
  );
};

export default CustomCard;
