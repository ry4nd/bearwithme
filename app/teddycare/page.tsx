'use client';
import { db } from "../firebase";
import { set, ref, onValue } from "firebase/database";
import { useState, useEffect } from "react";

// frontend
import './page.css';
import Navbar from '../components/navbar';
import Logo from './assets/logo-lilac.png'
import BearCrying from '../assets/bear_crying.png'
import BearHeart from '../assets/bear_heart.png'
import BearSleeping from '../assets/bear_sleeping.png'
import BearHappy from '../assets/bear_happy.png'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import StopCircleRoundedIcon from '@mui/icons-material/StopCircleRounded';
import PauseCircleFilledRoundedIcon from '@mui/icons-material/PauseCircleFilledRounded';
import PlayCircleRoundedIcon from '@mui/icons-material/PlayCircleRounded';
import Slider from '@mui/material/Slider';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';
import GraphicEqRoundedIcon from '@mui/icons-material/GraphicEqRounded';
import { on } from "events";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {auth} from '../firebase'
type AudioRecording = {
  filename: string;
  link: string;
};

export default function TeddyCare() {
  // speaker
  const [audioRecordings, setAudioRecordings] = useState<AudioRecording[]>([]);
  const [currentlyPlaying, setCurrentlyPlaying] = useState("0");
  const [isPaused, setIsPaused] = useState(false);
  const [volume, setVolume] = useState(15);
  // sound sensor
  const [isCrying, setIsCrying] = useState(0);
  // heartbeat sensor
  const [isRecording, setIsRecording] = useState(false);
  const [isVibrating, setIsVibrating] = useState(false);
  // authentication check
  const [userLogged, setUserLogged] = useState(false);
  
  
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

    onValue(isVibratingRef, (snapshot) => {
      const data = snapshot.val();
      setIsVibrating(data === 1 ? true : false);

      if (!isVibrating) {
        setIsRecording(false);
      }

      console.log(`isVibrating: ${data}`);
    });

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserLogged(true);
      } 
      else {
        setUserLogged(false);
      }
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
      setIsPaused(false);
    }
  };

  const handlePlayFirstAudio = async () => {
    set(audioPlayingRef, audioRecordings[0].link);
    setCurrentlyPlaying(audioRecordings[0].link);
    setIsPaused(false);
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
  const isRecordingRef = ref(db, "/heartbeat_data/is_recording"); // note: change when database is updated
  const isVibratingRef = ref(db, "/heartbeat_data/is_vibrating");

  const handleTransmitHeartbeat = () => {
    set(isRecordingRef, 1);
    setIsRecording(true);

    console.log(`setIsRecording: ${isRecording}`);
  };

  const handleStopVibration = () => {
    set(isVibratingRef, 0);
    setIsVibrating(false);
  }
  
  return (
    <div>
      <Navbar isAuthenticated={userLogged} inTeddyCare={true} />
      <div className="grid">
        <div className='sidebar'>
          {(isCrying ? true : false) &&
            <section id="notifications" onClick={handleCloseNotification}>
              <h4>Notifications</h4>
              <div className="notifications-container">
                <img src={BearCrying.src} alt="bear_crying" />
                <div>
                  <div>
                    <h6>Your Baby is Crying!</h6>
                    <p>Play a soothing sound</p>
                  </div>
                  <CancelRoundedIcon className="close-icon"/>
                </div>
              </div>
            </section>
          }
          <section id='heartbeat'>
            <h4>Recording</h4>
            <div className="heartbeat-container">
              {isVibrating && <img src={BearHeart.src} alt="bear_heart" />}
              <div>
                <div>
                  {isVibrating ? (
                    <div>
                      <h6>Sending Your Hearbeat</h6>
                      <p>Comforting your Baby</p>
                    </div>) : (
                    !isRecording ? (
                      <div>
                        <h6>Record Your Heartbeat</h6>
                        <p>Wear your BearWithMe bracelet</p>
                      </div>) : (
                      <div>
                        <h6>Recording Your Heartbeat</h6>
                        <p>Don&apos;t remove your bracelet</p>
                      </div>))
                  }
                </div>
                {isVibrating && <StopCircleRoundedIcon className="stop-icon" onClick={handleStopVibration}/>}
                {!isRecording && !isVibrating && <FavoriteRoundedIcon className="heart-icon" onClick={handleTransmitHeartbeat}/>}
              </div>
            </div>
          </section>
        </div>
        <main>
          <section id='now-playing'>
            <h4>Now Playing</h4>
            <div className="playing-container">
              {(currentlyPlaying !== "0") ? <img src={BearSleeping.src} alt="bear_sleeping" /> : <img src={BearHappy.src} alt="bear_happy" />}
              <div>
                <h6>
                  {currentlyPlaying !== "0" ?
                  (audioRecordings.map((audio: {filename: string, link: string}) => (
                    audio.link === currentlyPlaying ?
                    audio.filename :
                    ""))
                  ) : 
                  "..."}
                </h6>
                <div className="slider-container">
                  {/* {currentlyPlaying === "" ? // note for speaker: set isPaused to 0 when audio is done playing
                    <PlayCircleRoundedIcon className="play-icon" onClick={handlePlayFirstAudio} /> :
                    isPaused ? 
                      <PlayCircleRoundedIcon className="play-icon" onClick={handlePauseAudio} /> :
                      <PauseCircleFilledRoundedIcon className="pause-icon" onClick={handlePauseAudio} />
                  } */}
                  <div className="slider">
                    <VolumeDown className="volumedown-icon"/>
                    <Slider
                      aria-label="Volume"
                      value={volume}
                      onChange={handleVolumeChange}
                      min={0} max={30} step={1}
                      defaultValue={15} 
                      valueLabelDisplay="auto"
                    />
                    <VolumeUp className="volumeup-icon"/>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section id='sounds'>
            <h4>Sounds</h4>
            {audioRecordings.map((audio: AudioRecording) => (
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
        </main>
      </div>
    </div>
  );
}
