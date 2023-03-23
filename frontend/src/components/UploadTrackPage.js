import React, { useState, useContext } from 'react';
import './UploadTrackPage.css'
import { postSong } from '../services/UserService';

const UploadTrackPage = (props) => {
  const [trackName, setTrackName] = useState('');
  const [artistName, setArtistName] = useState('');
  const [albumArt, setAlbumArt] = useState('');
  const [audioFile, setAudioFile] = useState('');
  const userId = localStorage.getItem('userId');

  const handleTrackNameChange = (event) => {
    setTrackName(event.target.value);
  };

  const handleArtistNameChange = (event) => {
    setArtistName(event.target.value);
  };

  const handleAlbumArtChange = (event) => {
    setAlbumArt(event.target.value);
  };

  const handleAudioFileChange = (event) => {
    setAudioFile(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
     // include userId field
    const songData={
      trackName: trackName,
      artistName: artistName,
      albumArt: albumArt,
      audioFile: audioFile,
      userId: userId
    }
    props.addSong({trackName: trackName, artistName: artistName, albumArt:albumArt,audioFile: audioFile})
    const response = await postSong(songData);
    setTrackName('')
    setArtistName('')
    setAlbumArt('')
    setAudioFile('')
  };

  return (
        <div className="container">
          <div className="card">
            <div className="card-header">
              <h2 className="text-center">Upload a New Track</h2>
            </div>
            <div className="card-body" style={{ overflowY: "scroll", maxHeight: "400px" }}>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Track Name</label>
                  <input type="text" className="form-control" placeholder="Enter track name" value={trackName} onChange={handleTrackNameChange} />
                </div>
                <div className="form-group">
                  <label>Artist Name</label>
                  <input type="text" className="form-control" placeholder="Enter artist name" value={artistName} onChange={handleArtistNameChange} />
                </div>
                <div className="form-group">
                  <label>Album Art</label>
                  <input type="text" className="form-control" placeholder="Enter albumArt URL" value={albumArt} onChange={handleAlbumArtChange} />
                </div>
                {albumArt && (
                  <div className="text-center">
                    <img src={albumArt} alt="Album Art" style={{ maxWidth: "100%", marginTop: "1.5rem" }} />
                  </div>
                )}
                <div className="form-group">
                  <label>Audio File</label>
                  <input type="text" className="form-control" placeholder="Enter music URL" value={audioFile} onChange={handleAudioFileChange} />
                </div>
                {audioFile && (
                  <div className="text-center">
                    <audio controls style={{ width: "100%", marginTop: "1.5rem" }}>
                      <source src={audioFile} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                )}
                <div className="text-center">
                  <button className="btn btn-primary" type="submit">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

  );
};

export default UploadTrackPage;
