import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { playerActions } from "../../redux/playerSlice";
import "./style.scss";

const Ayah = ({ surahNumber, number, arText, uzText, audio, changeSurah }) => {
  const { isPlaying, currentSurahNumber, currentAudioNumber, showPlayer } =
    useSelector((state) => state.player);
  const [isCurrentAyah, setIsCurrentAyah] = useState(false);
  const [isCurrentSurah, setIsCurrentSurah] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (number === currentAudioNumber) {
      setIsCurrentAyah(true);
    } else setIsCurrentAyah(false);
  }, [currentAudioNumber]);

  useEffect(() => {
    if (surahNumber === currentSurahNumber) {
      setIsCurrentSurah(true);
    } else setIsCurrentSurah(false);
  }, [currentSurahNumber]);

  function handleClick() {
    if (surahNumber !== currentSurahNumber) {
      changeSurah();
    }
    if (!showPlayer) dispatch(playerActions.showPlayer());
    if (isCurrentSurah && isCurrentAyah) {
      if (isPlaying) {
        dispatch(playerActions.pause());
      } else dispatch(playerActions.play());
    } else {
      dispatch(playerActions.setCurrentAudio(audio));
      dispatch(playerActions.setCurrentSurahNumber(surahNumber));
      dispatch(playerActions.setCurrentAudioNumber(number));
      dispatch(playerActions.play());
    }
  }

  const style = {
    boxShadow: isPlaying
      ? "0 0 150px #ffe4c4aa inset, 0 0 30px  #ffe4c4aa"
      : "0 0 150px #aaa inset, 0 0 30px  #fffa",
  };

  return (
    <div
      className={isCurrentSurah && isCurrentAyah ? "ayah ayah-current" : "ayah"}
      style={isCurrentSurah && isCurrentAyah ? style : null}
    >
      <span className="ayah-number">{number}</span>
      <p className="ayah-arText">{arText}</p>
      <p className="ayah-uzText">{uzText}</p>
      <button className="play-btn" onClick={handleClick}>
        {isCurrentSurah && isCurrentAyah && isPlaying ? (
          <i className="bi bi-pause-circle-fill"></i>
        ) : (
          <i className="bi bi-play-circle-fill"></i>
        )}
      </button>
    </div>
  );
};

export default Ayah;
