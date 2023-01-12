import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { playerActions } from "../../redux/playerSlice";
import "./style.scss";

const Player = () => {
  const { audioArray, currentAudio, currentAudioNumber, isPlaying, paused } =
    useSelector((state) => state.player);
  const { success } = useSelector((state) => state.surah);
  const audioElement = useRef();
  const dispatch = useDispatch();
  const [currentNumber, setCurrentNumber] = useState(0);

  console.log(
    "CurrentAUDIO ---",
    currentAudioNumber,
    "CurrentNumber --- ",
    currentNumber
  );

  useEffect(() => {
    setCurrentNumber(currentAudioNumber);
    console.log(
      "CurrentAUDIO ---",
      currentAudioNumber,
      "CurrentNumber --- ",
      currentNumber
    );
  }, [currentAudioNumber]);

  useEffect(() => {
    if (success) {
      dispatch(playerActions.setCurrentAudio(audioArray[currentNumber].audio));
    }
  }, [success]);

  useEffect(() => {
    if (isPlaying) {
      audioElement.current.play();
      // setCurrentNumber((currentNumber) => currentNumber + 1);
    } else audioElement.current?.pause();
  }, [isPlaying]);

  function play() {
    if (audioElement.current?.paused) {
      audioElement.current.play();
      dispatch(playerActions.setPause(false));
    } else {
      audioElement.current.pause();
      dispatch(playerActions.setPause(true));
    }
  }

  function prev() {
    audioElement.current.pause();
    setCurrentNumber((currentNumber) => currentNumber - 1);
    dispatch(playerActions.setCurrentAudio(audioArray[currentNumber].audio));
    dispatch(playerActions.play());
  }

  function next() {
    audioElement.current.pause();
    setCurrentNumber((currentNumber) => currentNumber + 1);
    dispatch(playerActions.setCurrentAudio(audioArray[currentNumber].audio));
    dispatch(playerActions.play());
  }

  function handleEnded() {
    if (currentNumber === audioArray.length) {
      return setCurrentNumber(0);
    } else setCurrentNumber((currentNumber) => currentNumber + 1);
    dispatch(playerActions.setCurrentAudio(audioArray[currentNumber].audio));
    dispatch(playerActions.play());
  }

  return success ? (
    <div className="player">
      <audio
        src={currentAudio}
        ref={audioElement}
        onPlay={() => dispatch(playerActions.stop())}
        onEnded={handleEnded}
      ></audio>
      <div className="player-controls">
        <button className="prev-btn" onClick={prev}>
          <i className="bi bi-skip-backward-fill"></i>
        </button>
        <button className="play-pause-btn" onClick={play}>
          {paused ? (
            <i className="bi bi-play-fill"></i>
          ) : (
            <i className="bi bi-pause-fill"></i>
          )}
        </button>
        <button className="next-btn" onClick={next}>
          <i className="bi bi-skip-forward-fill"></i>
        </button>
      </div>
    </div>
  ) : null;
};

export default Player;
