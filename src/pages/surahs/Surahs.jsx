import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { surahActions } from "../../redux/surahSlice";
import { Link } from "react-router-dom";
import axios from "axios";
import "./style.scss";
import { LoaderWithWrapper } from "../../components/loader/Loader";
import Error from "../../components/errorMsg/Error";

const api = axios.create({
  baseURL: "http://api.alquran.cloud/v1/surah",
});

const Surahs = () => {
  const [surahs, setSurahs] = useState([]);
  const [error, setError] = useState(null);
  const { loading } = useSelector((state) => state.surah);
  const dispatch = useDispatch();

  useEffect(() => {
    const getSurahs = async () => {
      dispatch(surahActions.getSurahStart());
      const response = await api.get().catch((err) => {
        dispatch(surahActions.getSurahFail());
        setError(err.message);
      });
      dispatch(surahActions.getSurahSuccess());
      setSurahs(response.data.data);

      // console.log(response.data.data);
    };
    getSurahs();
  }, []);

  return loading ? (
    <LoaderWithWrapper width={"20%"} height={null} type={"bubbles"} color={"#fff7"} />
  ) : error ? (
    <Error msg={"Xatolik"} />
  ) : (
    <div className="surah-container">
      {surahs.map((item) => {
        return (
          <Link to={`/surah/${item.number}`} key={item.number}>
            <div className="surah-box">
              <p className="number">{item.number}</p>
              <p className="ar-name">{item.name}</p>
              <p className="name">
                {item.englishName} - {item.numberOfAyahs}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Surahs;
