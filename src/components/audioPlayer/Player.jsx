import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { playerActions } from "../../redux/playerSlice";
import "./style.scss";

const Player = () => {
  const { audioArray, showPlayer, currentAudio, isPlaying } = useSelector(
    (state) => state.player
  );
  const [audios, setAudios] = useState([]);
  const audioElement = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    setAudios(audioArray);
    if (isPlaying) {
      audioElement.current.play();
    }
  }, [isPlaying]);

  function play() {
    audioElement.current.play();
    dispatch(playerActions.stop());
  }

  return showPlayer ? (
    <div className="player">
      <audio
        src={currentAudio}
        ref={audioElement}
        onPlay={() => dispatch(playerActions.stop())}
      ></audio>
      <div className="player-controls">
        <button className="prev-btn">
          <i className="bi bi-skip-backward-fill"></i>
        </button>
        <button className="play-pause-btn" onClick={play}>
          <i className="bi bi-play-fill"></i>
        </button>
        <button className="next-btn">
          <i className="bi bi-skip-forward-fill"></i>
        </button>
      </div>
    </div>
  ) : null;
};

export default Player;
