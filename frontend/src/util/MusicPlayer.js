import React, { useState } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './MusicPlayer.css';

const MusicPlayer = (props) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const trackName = props.song.trackName;
  const artistName = props.song.artistName;
  const audioFile = props.song.audioFile;
  const albumArt = props.song.albumArt;

  const handleTimeUpdate = (e) => {
    setCurrentTime(e.target.currentTime);
    setDuration(e.target.duration);
  };

  return (
    <div className="music-playback-container">
      <img src={albumArt} className="music-playback-image" alt="Album Art" />
      <AudioPlayer
        src={audioFile}
        showJumpControls={false}
        layout="stacked-reverse"
        customAdditionalControls={[]}
        onEnded={() => props.setSelectedSong(null)}
        onTimeUpdate={handleTimeUpdate}
        progressUpdateInterval={100}
        volume={0.5}
        currentTime={currentTime}
        duration={duration}
      />
    </div>
  );
};

export default MusicPlayer;
