import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { playerActions } from "../../redux/playerSlice";
import "./style.scss";

const Ayah = ({ number, arText, uzText, audio }) => {
  const { paused } = useSelector((state) => state.player);
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(playerActions.showPlayer());
    dispatch(playerActions.setCurrentAudio(audio));
    dispatch(playerActions.setCurrentAudioNumber(number));
    dispatch(playerActions.play());
  }

  return (
    <div className="ayah">
      <span className="ayah-number">{number}</span>
      <p className="ayah-arText">{arText}</p>
      <p className="ayah-uzText">{uzText}</p>
      <button className="play-btn" onClick={handleClick}>
        <i className="bi bi-play-circle-fill"></i>
        {/* <i class="bi bi-pause-circle-fill"></i> */}
      </button>
    </div>
  );
};

export default Ayah;
