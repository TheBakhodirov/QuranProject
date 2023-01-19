import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { playerActions } from "../../redux/playerSlice";
import { Loader } from "../loader/Loader";
import "./style.scss";

const Player = () => {
  const {
    audioArray,
    showPlayer,
    currentSurah,
    currentSurahNumber,
    currentAudio,
    currentAudioNumber,
    isPlaying,
    paused,
  } = useSelector((state) => state.player);
  const { success } = useSelector((state) => state.surah);
  const audioElement = useRef();
  const dispatch = useDispatch();
  const [currentNumber, setCurrentNumber] = useState(0);
  const [progress, setProgress] = useState(0);
  const [audioStateSuccess, setAudioStateSuccess] = useState(false);
  const [audioStateLoading, setAudioStateLoading] = useState(false);

  useEffect(() => {
    setCurrentNumber(currentAudioNumber);
  }, [currentAudioNumber]);

  useEffect(() => {
    if (success) {
      dispatch(playerActions.setCurrentAudio(audioArray[currentNumber]?.audio));
    }
  }, [success]);

  useEffect(() => {
    if (isPlaying) {
      audioElement.current.play();
      dispatch(playerActions.setPlayingSurah(true));
      setProgress(0);
    }
  }, [currentNumber]);

  function play() {
    if (audioElement.current?.paused) {
      if (currentNumber === 0) {
        setCurrentNumber((currentNumber) => currentNumber + 1);
      }
      audioElement.current.play();
      dispatch(playerActions.setPause(false));
      dispatch(playerActions.play());
    } else {
      audioElement.current?.pause();
      dispatch(playerActions.setPause(true));
      dispatch(playerActions.stop());
    }

    dispatch(playerActions.setPlayingSurah(true));
  }

  function handleEnded() {
    if (currentNumber === audioArray.length) {
      audioElement.current.pause();
      dispatch(playerActions.stop());
      dispatch(playerActions.setPause(true));
      setCurrentNumber(0);
      dispatch(playerActions.setCurrentAudio(audioArray[0].audio));
      return;
    } else {
      setCurrentNumber((currentNumber) => currentNumber + 1);
      dispatch(playerActions.setCurrentAudio(audioArray[currentNumber].audio));
    }
  }

  function closePlayer() {
    dispatch(playerActions.hidePlayer());
    setProgress(0);
  }

  function onPlaying() {
    const duration = audioElement.current.duration;
    const ct = audioElement.current.currentTime;
    const currentProgress = (ct / duration) * 100;
    setProgress(currentProgress);
  }

  function onLoading() {
    setAudioStateLoading(true);
  }

  function onLoaded() {
    setAudioStateSuccess(true);
    setAudioStateLoading(false);
  }

  function onError() {
    setAudioStateSuccess(false);
    setAudioStateLoading(false);
  }

  function onStalled() {
    if (navigator.onLine) {
      console.log("Online");
      setAudioStateLoading(true);
    } else setAudioStateSuccess(false);
  }

  return showPlayer ? (
    <div className="player">
      <audio
        src={currentAudio}
        ref={audioElement}
        onEnded={handleEnded}
        onTimeUpdate={onPlaying}
        onLoadStart={onLoading}
        onCanPlay={onLoaded}
        onError={onError}
        onStalled={() => onStalled}
      ></audio>
      <div className="player-controls">
        <button className="play-pause-btn" onClick={play}>
          {paused ? (
            <i className="bi bi-play-fill"></i>
          ) : (
            <i className="bi bi-pause-fill"></i>
          )}
        </button>
      </div>
      <div className="player-info">
        <div className="name">
          <p className="surah-name">{currentSurah}</p>
          <p className="ayah-in-surah">
            {currentSurahNumber} : {currentNumber === 0 ? 1 : currentNumber}
          </p>
          <div className="audio-state">
            {audioStateLoading ? (
              <Loader width="20px" height={null} type="spin" />
            ) : (
              <span className="audio-loading-result">
                {audioStateSuccess ? null : (
                  <i className="bi bi-x audio-loading-error"></i>
                )}
              </span>
            )}
          </div>
        </div>
        <div className="progress-bar-wrapper">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
      <button className="player-close-btn" onClick={closePlayer}>
        <i className="bi bi-x-lg"></i>
      </button>
    </div>
  ) : null;
};

export default Player;
