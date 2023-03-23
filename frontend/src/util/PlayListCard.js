import React, { useState } from 'react';
import Modal from './Modal';
import './PlayListCard.css'
import { updatePlaylist } from '../services/UserService';
import CustomCard from '../components/CustomCard';

const Playlistcard = ({ playlist }) => {
  const [showModal, setShowModal] = useState(false);
  const [newTrack, setNewTrack] = useState({
    trackName: '',
    artistName: '',
    albumArt: '',
    audioFile: '',
  });
  const [playlistCopy, setPlaylistCopy] = useState(playlist);

  const handleAddTrack = async (e) => {
    e.preventDefault();
    const updatedPlaylist = {
        ...playlistCopy,
        tracks: [...playlistCopy.tracks, newTrack],
      };
    try{
        await updatePlaylist(updatedPlaylist,playlist.userId)
        setNewTrack({
          trackName: '',
          artistName: '',
          albumArt: '',
          audioFile: '',
        })
        setPlaylistCopy(updatedPlaylist)
        setShowModal(false);
    }catch (error) {
        console.error(error);
    }
    
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTrack({ ...newTrack, [name]: value });
  };

  const handleRemoveTrack = async (index) => {
    const updatedTracks = [...playlistCopy.tracks];
    updatedTracks.splice(index, 1);
    setPlaylistCopy({
      ...playlistCopy,
      tracks: updatedTracks,
    });
    try{
        await updatePlaylist(playlistCopy,playlist.userId)
    }catch(error){
    }
  };

  return (
    <div className="playlist-card">
      <div style={{display:'inline-block'}}>
        <h3>{playlistCopy.playlistName}</h3>
      </div>
      <div style={{display:'inline-block', marginLeft:'40px'}}>
        <button onClick={() => setShowModal(true)}>Add Track</button>
      </div>
          <div className="song-list-playlist" style={{ overflowY: "scroll", height: "300px" }}>
            {playlistCopy.tracks.map((song, index) => (
            <div key={index} style={{height:'300px',width:'100px'}}>
              <CustomCard
                key={index}
                trackName={song.trackName}
                artistName={song.artistName}
                albumArt={song.albumArt}
                audioFile={song.audioFile}
              />
              <div style={{display:'inline-block', marginLeft:'50px', width:'200px'}}>
                <button onClick={() => handleRemoveTrack(index)}>Remove Track</button>
              </div>
              </div>
            ))}
          </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="container">
            <div className="card">
              <div className="card-header">
                <h2 className="text-center">Upload a New Track</h2>
              </div>
              <div className="card-body" style={{ overflowY: "scroll", maxHeight: "400px" }}>
                <form onSubmit={handleAddTrack}>
                  <div className="form-group">
                    <label>Track Name</label>
                    <input type="text" className="form-control" placeholder="Enter track name" name="trackName" value={newTrack.trackName} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label>Artist Name</label>
                    <input type="text" className="form-control" placeholder="Enter artist name" name="artistName" value={newTrack.artistName} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label>Album Art</label>
                    <input type="text" className="form-control" placeholder="Enter albumArt URL" name="albumArt" value={newTrack.albumArt} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label>Audio File</label>
                    <input type="text" className="form-control" placeholder="Enter music URL" name="audioFile" value={newTrack.audioFile} onChange={handleInputChange} />
                  </div>
                  <div className="text-center">
                    <button className="btn btn-primary" type="submit">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Playlistcard;
