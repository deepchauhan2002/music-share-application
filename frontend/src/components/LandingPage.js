import React, { useState,useEffect} from "react";
import "./LandingPage.css";
import { getSongs } from "../services/UserService";
import CustomCard from "./CustomCard";
import MusicPlayer from "../util/MusicPlayer";

const LandingPage = () => {
  const [tracks, setTracks] = useState([]);
  const [filteredTracks, setFilteredTracks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSong,setSelectedSong] = useState(null)

  useEffect(() => {
    const getAllTracks = async () => {
      try {
        const response = await getSongs()
        setTracks(response.data);
        setFilteredTracks(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getAllTracks();
  }, []);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = tracks.filter(
      (track) =>
        track.trackName.toLowerCase().includes(term) ||
        track.artistName.toLowerCase().includes(term)
    );
    setFilteredTracks(filtered);
  };

  const handleCardClick = (song) =>{
    setSelectedSong(song);
  }

  return (
    <div className="landing-page">
      <h2>Browse your music here.</h2>
      <div className="section section-1">
      <div className="search-container">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

      </div>
      <div className="section section-2">
        <div className="track-grid">
          {filteredTracks.map((song,index) => (
            <div onClick={()=> handleCardClick(song)} key={index} style={{height:'200px',width:'200px'}}>
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
      </div>
      {selectedSong && (
        <MusicPlayer
          song={selectedSong}
          setSelectedSong={setSelectedSong}
          onClose={() => setSelectedSong(null)}
        />
      )}
    </div>
  );
};

export default LandingPage;
