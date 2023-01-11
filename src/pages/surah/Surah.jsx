import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { playerActions } from "../../redux/playerSlice";
import Ayah from "../../components/ayahBox/Ayah";
import Error from "../../components/errorMsg/Error";
import Loading from "../../components/loading/Loading";
import "./style.scss";

const api = axios.create({
  baseURL: "http://api.alquran.cloud/v1/surah",
});

const Surah = () => {
  const state = useParams();
  const [arName, setArName] = useState(null);
  const [enName, setEnName] = useState(null);
  const [ayahs, setAyahs] = useState([]);
  const [uzAyahs, setUzAyahs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getSurah() {
      setLoading(true);
      const response = await api.get(`/${state.id}/ar.alafasy`).catch((err) => {
        setError(err);
      });
      const data = response.data.data;
      setArName(data.name);
      setEnName(data.englishName);
      setAyahs(data.ayahs);
      dispatch(playerActions.setAudios(data.ayahs));
      console.log(data.ayahs);
    }

    async function getUzEdit() {
      const response = await api.get(`/${state.id}/uz.sodik`).catch((err) => {
        setError(err);
        setLoading(false);
      });
      setUzAyahs(response.data.data.ayahs);
      setLoading(false);
    }

    getSurah();
    getUzEdit();
  }, []);

  function playAyah(ayahNumber) {}

  return !loading ? (
    !error ? (
      <div className="surah">
        <h3>
          {arName} - {enName}
        </h3>
        <div className="ayahs-container">
          {ayahs.map((item, i) => {
            return (
              <Ayah
                key={i}
                number={item.numberInSurah}
                arText={item.text}
                uzText={uzAyahs[i].text}
                audio={item.audio}
              />
            );
          })}
        </div>
      </div>
    ) : (
      <Error />
    )
  ) : (
    <Loading />
  );
};

export default Surah;
