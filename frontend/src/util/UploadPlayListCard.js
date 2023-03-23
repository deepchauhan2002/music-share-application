import React, { useState } from 'react';
import { postPlaylists } from '../services/UserService';
import './UploadPlayListCard.css'
const UploadPlaylistCard = ({ userId }) => {
  const [playlistName, setPlaylistName] = useState('');
  const [tracks, setTracks] = useState([]);
  const [trackName, setTrackName] = useState('');
  const [albumArt, setAlbumArt] = useState('');
  const [audioFile, setAudioFile] = useState('');
  const [artistName, setArtistName] = useState('');

  const handleChange = (event) => {
    switch (event.target.name) {
      case 'playlistName':
        setPlaylistName(event.target.value);
        break;
      case 'trackName':
        setTrackName(event.target.value);
        break;
      case 'albumArt':
        setAlbumArt(event.target.value);
        break;
      case 'audioFile':
        setAudioFile(event.target.value);
        break;
      case 'artistName':
        setArtistName(event.target.value);
        break;
      default:
        break;
    }
  }

  const handleTrackSubmit = async (event) => {
    event.preventDefault();
    const newTrack = {
      trackName: trackName,
      albumArt: albumArt,
      audioFile: audioFile,
      artistName: artistName,
    }
    setTracks([...tracks, newTrack]);
    setTrackName('');
    setAlbumArt('');
    setAudioFile('');
    setArtistName('');
  }

  const handlePlaylistSubmit = async (event) => {
    event.preventDefault();
    const playlistData = {
        playlistName:playlistName,
        tracks:tracks,
        userId:userId
    }
    try {
      const response = await postPlaylists(playlistData);
      setPlaylistName('');
      setTracks([]);
      alert('Playlist uploaded successfully!');
    } catch (error) {
      console.error(error);
    }
  }

  const deleteTrack = (index) => {
    const newTracks = [...tracks];
    newTracks.splice(index, 1);
    setTracks(newTracks);
  }

  return (
    <div className="playlist-card-container">
      <h2>Upload a Playlist</h2>
      <label>
        Playlist Name:
        <input type="text" name="playlistName" value={playlistName} onChange={handleChange} />
      </label>

      <label>
        Track Name:
        <input type="text" name="trackName" value={trackName} onChange={handleChange} />
      </label>
      <label>
        Album Art:
        <input type="text" name="albumArt" value={albumArt} onChange={handleChange} />
      </label>
      <label>
        Audio File:
        <input type="text" name="audioFile" value={audioFile} onChange={handleChange} />
      </label>
      <label>
        Artist Name:
        <input type="text" name="artistName" value={artistName} onChange={handleChange} />
      </label>
      <button onClick={handleTrackSubmit}>Add Track</button>
      <br />
      <button onClick={handlePlaylistSubmit}>Add Playlist</button>
        <h4>Tracks</h4>
        {tracks.map((track, index) =>
          <div className="track-details" key={index}>
            <p>{track.trackName} - {track.artistName} - {track.albumArt} - {track.audioFile}</p>
            <button onClick={() => deleteTrack(index)}>Delete</button>
            </div>
    )}
  </div>
  )
}

export default UploadPlaylistCard;