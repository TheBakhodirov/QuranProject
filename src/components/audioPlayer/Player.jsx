import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
  } = useSelector((state) => state.player);
  const { success } = useSelector((state) => state.surah);
  const audioElement = useRef();
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(0);
  const [audioStateSuccess, setAudioStateSuccess] = useState(false);
  const [audioStateLoading, setAudioStateLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (showPlayer) {
      dispatch(playerActions.setPlayingSurah(true));
    } else dispatch(playerActions.setPlayingSurah(false));
  }, [showPlayer]);

  useEffect(() => {
    if (success) {
      dispatch(playerActions.setCurrentAudio(audioArray[0]?.audio));
    }
  }, [success]);

  useEffect(() => {
    audioElement.current?.play();
    setProgress(0);
  }, [currentAudioNumber, currentSurahNumber]);

  useEffect(() => {
    if (isPlaying) {
      audioElement.current.play();
    } else {
      audioElement.current?.pause();
    }
  }, [isPlaying]);

  function play() {
    if (audioElement.current?.paused) {
      if (currentAudioNumber === 0) {
        dispatch(playerActions.setCurrentAudioNumber(currentAudioNumber + 1));
      }
      dispatch(playerActions.play());
    } else {
      dispatch(playerActions.pause());
    }
  }

  function handleEnded() {
    if (currentAudioNumber === audioArray.length) {
      dispatch(playerActions.pause());
      dispatch(playerActions.setCurrentAudioNumber(0));
      dispatch(playerActions.setCurrentAudio(audioArray[0].audio));
      return;
    } else {
      dispatch(playerActions.setCurrentAudioNumber(currentAudioNumber + 1));
      dispatch(
        playerActions.setCurrentAudio(audioArray[currentAudioNumber].audio)
      );
    }
  }

  function closePlayer() {
    dispatch(playerActions.closePlayer());
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
          {isPlaying ? (
            <i className="bi bi-pause-fill"></i>
          ) : (
            <i className="bi bi-play-fill"></i>
          )}
        </button>
      </div>
      <div className="player-info">
        <div className="surah-info">
          <span className="surah-info-name-number">
            <p className="surah-name">{currentSurah}</p>
            <p className="ayah-in-surah">
              {currentSurahNumber} :{" "}
              {currentAudioNumber === 0 ? 1 : currentAudioNumber}
            </p>
          </span>
          <div className="audio-state">
            {audioStateLoading ? (
              <Loader width="16px" height={null} type="spin" />
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
