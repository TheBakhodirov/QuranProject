import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import "./style.scss";
import { Link } from "react-router-dom";

const api = axios.create({
  baseURL: "http://api.alquran.cloud/v1/surah",
});

const Surahs = () => {
  const [surahs, setSurahs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getSurahs = async () => {
      const response = await api.get().catch((err) => {
        setError(err);
      });
      setSurahs(response.data.data);
    };
    getSurahs();
  }, []);

  return (
    <div className="surah-container">
      {surahs.map((item) => {
        return (
          <Link to={`/surah/${item.number}`} key={item.number}>
            <div className="surah-box">
              <p className="number">{item.number}</p>
              <p className="name">{item.englishName}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Surahs;
