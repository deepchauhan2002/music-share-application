import React, { useState } from "react";
import CustomCard from "./CustomCard";
import MusicPlayer from "../util/MusicPlayer";
import './SongList.css'

const SongList = ({ songs }) => {
  const [selectedSong, setSelectedSong] = useState(null);

  const handleCardClick = (song) => {
    setSelectedSong(song);
  };

  return (
    <>
      <div className="song-list" style={{ overflowY: "scroll", height: "500px" }}>
        {songs.map((song, index) => (
        <div onClick={() => handleCardClick(song)} key={index} style={{height:'200px',width:'200px'}}>
          <CustomCard
            key={index}
            trackName={song.trackName}
            artistName={song.artistName}
            albumArt={song.albumArt}
            audioFile={song.audioFile}
          />
          </div>
        ))}
      </div>
      {selectedSong && (
        <MusicPlayer
          song={selectedSong}
          setSelectedSong={setSelectedSong}
          onClose={() => setSelectedSong(null)}
        />
      )}
    </>
  );
};

export default SongList;
