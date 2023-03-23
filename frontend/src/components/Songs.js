import React, { useState, useEffect } from 'react';
import './Songs.css';
import UploadTrackPage from './UploadTrackPage';
import SongList from './SongList';
import { getSongsByUserId } from '../services/UserService';
import { ThreeDots } from "react-loader-spinner";

const Songs = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSongs = async () => {
      setLoading(true);
      const userId = localStorage.getItem('userId')
      const token = localStorage.getItem('token')
      const songsData = await getSongsByUserId(userId,token);
      setSongs(songsData.data);
      setLoading(false);
    };
    fetchSongs();
  },[]);

  const addSong = (response) => {
    setSongs([...songs, response]);
  };

  return (
    <>
      {loading ? (
        <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#4fa94d"
            ariaLabel="three-dots-loading"
            wrapperStyle={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
            wrapperClassName=""
            visible={true}
          />
      ) : (
        <div className="songs" style={{ marginLeft: '100px', marginTop: '10px' }}>
          <div className="left-column">
            <h1>Uploaded tracks.</h1>
            <SongList songs={songs} />
          </div>
          <div className="right-column">
          <UploadTrackPage addSong={addSong} />
          </div>
        </div>
      )}
    </>
  );
};

export default Songs;
