import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { playerActions } from "../../redux/playerSlice";
import Ayah from "../../components/ayahBox/Ayah";
import Error from "../../components/errorMsg/Error";
import { LoaderWithWrapper } from "../../components/loader/Loader";
import "./style.scss";
import { surahActions } from "../../redux/surahSlice";

const api = axios.create({
  baseURL: "https://api.alquran.cloud/v1/surah",
});

const Surah = () => {
  const state = useParams();
  const [arName, setArName] = useState(null);
  const [enName, setEnName] = useState(null);
  const [surahNumber, setSurahNumber] = useState(0);
  const [ayahs, setAyahs] = useState([]);
  const [uzAyahs, setUzAyahs] = useState([]);
  const [error, setError] = useState(null);
  const { playingSurah } = useSelector((state) => state.player);
  const { success, loading } = useSelector((state) => state.surah);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getSurah() {
      dispatch(surahActions.getSurahStart());
      const response = await api.get(`/${state.id}/ar.alafasy`).catch((err) => {
        setError(err);
      });
      const data = response?.data.data;
      setArName(data?.name);
      setEnName(data?.englishName);
      setAyahs(data?.ayahs);
      setSurahNumber(data?.number);
    }

    async function getUzEdit() {
      const response = await api.get(`/${state.id}/uz.sodik`).catch((err) => {
        setError(err);
        dispatch(surahActions.getSurahFail());
      });
      setUzAyahs(response?.data.data.ayahs);
      dispatch(surahActions.getSurahSuccess());
    }

    getSurah();
    getUzEdit();
  }, []);

  useEffect(() => {
    if (!playingSurah) {
      changeSurah();
    }
  }, [success]);

  function changeSurah() {
    dispatch(playerActions.setAudios(ayahs));
    dispatch(playerActions.setCurrentSurahName(enName));
  }

  return loading ? (
    <LoaderWithWrapper
      width={"20%"}
      height={null}
      type={"bubbles"}
      color={"#fff7"}
    />
  ) : error ? (
    <Error msg={"Xatolik"} />
  ) : (
    <div className="surah">
      <div className="surah-title">
        <p className="surah-title-ar-name">{arName}</p>
        <p className="surah-title-en-name">{enName}</p>
      </div>
      <div className="ayahs-container">
        {ayahs.map((item, i) => {
          return (
            <Ayah
              key={i}
              surahNumber={surahNumber}
              number={item.numberInSurah}
              arText={item.text}
              uzText={uzAyahs[i]?.text}
              audio={item.audio}
              changeSurah={changeSurah}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Surah;
