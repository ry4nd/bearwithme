'use client';
import { db } from "./firebase";
import { set, ref, onValue } from "firebase/database";
import { useState, useEffect } from "react";

// frontend
import './page.css';
import Logo from './assets/logo-lilac.png'
import BearCrying from './assets/bear_crying.png'
import BearHeart from './assets/bear_heart.png'
import BearSleeping from './assets/bear_sleeping.png'
import BearHappy from './assets/bear_happy.png'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import PlayCircleRoundedIcon from '@mui/icons-material/PlayCircleRounded';
import Slider from '@mui/material/Slider';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';
import GraphicEqRoundedIcon from '@mui/icons-material/GraphicEqRounded';

export default function Home() {
  const [audioRecordings, setAudioRecordings] = useState([]);   // sound recordings
  const [isTransmitting, setIsTransmitting] = useState(false);  // heartbeat
  const [isCrying, setIsCrying] = useState(0);                  // sound sensor
  const [currentlyPlaying, setCurrentlyPlaying] = useState("");
  const [volume, setVolume] = useState(30);

  // speaker
  useEffect(() => {
    const soundRecordingsRef = ref(db, '/speaker/audioRecording');

    onValue(soundRecordingsRef, (snapshot) => {
      const data = snapshot.val();
      setAudioRecordings(Object.values(data));

      console.log(data)
    });
  }, []);

  useEffect(() => {
    const audioPlayingRef = ref(db, "/speaker/audioPlaying");
    onValue(audioPlayingRef, (snapshot) => {
      const data = snapshot.val();
      setCurrentlyPlaying(data);
    });
  }, []);
  
  const handlePlayAudio = async (link: string) => {
    const audioPlayingRef = ref(db, "/speaker/audioPlaying")

    if (currentlyPlaying !== link) {
      set(audioPlayingRef, link);
      setCurrentlyPlaying(link);
    }
  };

  const handleVolumeChange = (event: Event, newValue: number | number[]) => {
    setVolume(newValue as number);
  };

  // heartbeat sensor
  const handleTransmitHeartbeat = () => {
    const heartbeatRef = ref(db, "/heartbeat_data/is_recording"); // note: change when database is updated
    set(heartbeatRef, !isTransmitting ? 1 : 0);
    setIsTransmitting(!isTransmitting);

    console.log(`isTransmitting: ${isTransmitting}`);
  };

  // sound sensor
  useEffect(() => {
    const isCryingRef = ref(db, "/soundSensor/isCrying");

    onValue(isCryingRef, (snapshot) => {
      const data = snapshot.val();
      setIsCrying(data);

      console.log(`isCrying: ${data}`);
    });
  }, [isCrying]); // note: idk if dapat "[]" or "[isCrying]" parang same behavior naman

  const handleCloseNotification = () => {
    const isCryingRef = ref(db, "/soundSensor/isCrying");
    set(isCryingRef, 0);
    setIsCrying(0);
  };

  return (
    <div className="grid">
      <div>
        <nav>
            <MenuRoundedIcon className="menu-icon"/>
            <div>
              <img src={Logo.src} alt="logo" className="logo"/>
              <AccountCircleIcon className="account-icon"/>
            </div>
            <LogoutIcon className="logout-icon"/>
        </nav>
        <div className='sidebar'>
          <section id="notifications" onClick={handleCloseNotification}>
            <h2>Notifications</h2>
            <div className="notifications-container">
              <img src={BearCrying.src} alt="bear_crying" />
              <div>
                <div>
                  <h3>Your Baby is Crying!</h3>
                  <p>Play a soothing sound</p>
                </div>
                <CancelRoundedIcon className="close-icon"/>
              </div>
            </div>
          </section>
          <section id='now-playing'>
            <h2>Now Playing</h2>
            <div className="heartbeat-container">
              <img src={BearHeart.src} alt="bear_heart" />
              <div>
                <div>
                  <h3>Send Your Heartbeat!</h3>
                  <p>Comfort your baby</p>
                </div>
                <FavoriteRoundedIcon className="heart-icon"/>
              </div>
            </div>
            <div className="playing-container">
              <img src={BearSleeping.src} alt="bear_sleeping" />
              <h3>lullaby</h3>
              <div>
                <PlayCircleRoundedIcon className="play-icon"/>
                <div className="slider">
                  <VolumeDown className="volumedown-icon"/>
                  <Slider 
                    aria-label="Volume"
                    value={volume}
                    onChange={handleVolumeChange}
                    min={0} max={30} step={1}
                    defaultValue={20} 
                    valueLabelDisplay="auto"
                  />
                  <VolumeUp className="volumeup-icon"/>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <section id='recordings'>
        <h1>Recordings</h1>
        <img src={BearHappy.src} alt="bear_happy" />
        {audioRecordings.map((audio: {filename: string; link: string}) => (
            <div key={audio.filename} className="audio-container">
              <p>{audio.filename}</p>
              <div onClick={() => handlePlayAudio(audio.link)}> 
                  {currentlyPlaying === audio.link ? 
                  (<GraphicEqRoundedIcon className="playing-icon"/>) :
                  (<PlayCircleRoundedIcon className="audio-play-icon"/>)
                }
              </div>
            </div>
          ))
        }
      </section>
    </div>
  );
}
