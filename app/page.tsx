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
import PauseCircleFilledRoundedIcon from '@mui/icons-material/PauseCircleFilledRounded';
import PlayCircleRoundedIcon from '@mui/icons-material/PlayCircleRounded';
import Slider from '@mui/material/Slider';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';
import GraphicEqRoundedIcon from '@mui/icons-material/GraphicEqRounded';

export default function Home() {
  // speaker
  const [audioRecordings, setAudioRecordings] = useState([]);
  const [currentlyPlaying, setCurrentlyPlaying] = useState("");
  const [isPaused, setIsPaused] = useState(false);
  const [volume, setVolume] = useState(30);
  // sound sensor
  const [isCrying, setIsCrying] = useState(0);
  // heartbeat sensor
  const [isTransmitting, setIsTransmitting] = useState(false);
  
  useEffect(() => {
    //speaker
    onValue(audioRecordingsRef, (snapshot) => {
      const data = snapshot.val();
      setAudioRecordings(Object.values(data));

      console.log(data)
    });

    onValue(audioPlayingRef, (snapshot) => {
      const data = snapshot.val();
      setCurrentlyPlaying(data);
    });

    onValue(isPausedRef, (snapshot) => {
      const data = snapshot.val();
      setIsPaused(data);
    });

    // sound sensor
    onValue(isCryingRef, (snapshot) => {
      const data = snapshot.val();
      setIsCrying(data);

      console.log(`isCrying: ${data}`);
    });
  }, []);

  // speaker
  const audioRecordingsRef = ref(db, '/speaker/audioRecording');
  const audioPlayingRef = ref(db, "/speaker/audioPlaying");
  const isPausedRef = ref(db, "/speaker/isPaused");
  const volumeRef = ref(db, "/speaker/volume");
  
  const handlePlayAudio = async (link: string) => {
    if (currentlyPlaying !== link) {
      set(audioPlayingRef, link);
      setCurrentlyPlaying(link);
    }
  };

  const handlePauseAudio = async () => {
    set(isPausedRef, !isPaused ? 1 : 0);
    setIsPaused(!isPaused);

    console.log(`isPaused: ${isPaused}`);
  };

  const handleVolumeChange = (event: Event, newValue: number | number[]) => {
    set(volumeRef, newValue as number);
    setVolume(newValue as number);
  };

  // sound sensor
  const isCryingRef = ref(db, "/soundSensor/isCrying");

  const handleCloseNotification = () => {
    set(isCryingRef, 0);
    setIsCrying(0);
  };

  // heartbeat sensor
  const heartbeatRef = ref(db, "/heartbeat_data/is_recording"); // note: change when database is updated

  const handleTransmitHeartbeat = () => {
    set(heartbeatRef, !isTransmitting ? 1 : 0);
    setIsTransmitting(!isTransmitting);

    console.log(`isTransmitting: ${isTransmitting}`);
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
          {(isCrying ? true : false) &&
            <section id="notifications" onClick={handleCloseNotification}>
              <h2>Notifications</h2>
              <div className="notifications-container">
                <div>
                  <img src={BearCrying.src} alt="bear_crying" />
                </div>
                <div>
                  <div>
                    <h3>Your Baby is Crying!</h3>
                    <p>Play a soothing sound</p>
                  </div>
                  <CancelRoundedIcon className="close-icon"/>
                </div>
              </div>
            </section>
          }
          <section id='now-playing'>
            <h2>Now Playing</h2>
            <div className="heartbeat-container">
              {/* <div> */}
                <img src={BearHeart.src} alt="bear_heart" />
              {/* </div> */}
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
              <h3>
                {currentlyPlaying ?
                (audioRecordings.map((audio: {filename: string, link: string}) => (
                  audio.link === currentlyPlaying ?
                  audio.filename :
                  ""))
                ) : 
                "..."}
              </h3>
              <div>
                {isPaused ? 
                  <PlayCircleRoundedIcon className="play-icon" onClick={handlePauseAudio} /> :
                  <PauseCircleFilledRoundedIcon className="pause-icon" onClick={handlePauseAudio} />
                }
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
