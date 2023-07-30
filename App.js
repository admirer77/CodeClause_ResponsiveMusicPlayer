import React, { useState, useRef } from 'react';
import './App.css';

const songs = [
  {
    title: 'Jawan Prevue theme',
    src:'https://www.bizasialive.com/wp-content/uploads/2022/09/jawan001.jpg',
    url: 'https://pagalworld.cam/songs/bollywood-mp3-songs/Jawan%202023%20Part%201/Jawan%20Prevue%20Theme%20128%20Kbps.mp3',
  },
  {
    title: 'Bekhayali',
    url: 'https://pagalsong.in/uploads/systemuploads/mp3/Kabir%20Singh/Bekhayali%20-%20Kabir%20Singh%20128%20Kbps.mp3',
  },
  {
    title: 'naan ready',
    url:'https://paglasongs.com/files/download/id/14563',
  },
  {
    title: 'ey bidda',
    url:'https://www.pagalworld.com.se/files/download/id/4710',
  },
];

function App() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const currentSong = songs[currentSongIndex];

  const playPauseHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const timeUpdateHandler = (e) => {
    setCurrentTime(e.target.currentTime);
    setDuration(e.target.duration);
  };

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setCurrentTime(e.target.value);
  };

  const handleSongEnd = () => {
    // Play the next song when the current song ends
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
  };

  const handleNextSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
  };

  const handlePreviousSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex - 1 + songs.length) % songs.length);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="App">
      <h1>Play the Melody...</h1>
      <div className="music-player">
        <audio
          ref={audioRef}
          src={currentSong.url}
          onTimeUpdate={timeUpdateHandler}
          onLoadedData={(e) => setDuration(e.target.duration)}
          onEnded={handleSongEnd}
        />
        <div className="song-details">
          <h2>{currentSong.title}</h2>
        </div>
        <div className="controls">
          <button onClick={handlePreviousSong} className='but1' >Previous</button>
          <button onClick={playPauseHandler} className='but1'>{isPlaying ? 'Pause' : 'Play'}</button>
          <button onClick={handleNextSong} className='but1'>Next</button>
          <input
            type="range"
            value={currentTime}
            max={duration}
            onChange={dragHandler}
          />
        </div>
        <div className="time">
          <span>{formatTime(currentTime)}</span> / <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
}

export default App;
