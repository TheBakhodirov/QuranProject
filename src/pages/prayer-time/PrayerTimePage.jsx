import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { prayerTimesIcons } from "../../assets/prayerTimesIcons";
import "./style.scss";

const api = axios.create({
  baseURL: "https://islomapi.uz/api/present/",
});

const PrayerTime = () => {
  const [error, setError] = useState(null);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(() => getTime());
  const [prayers, setPrayers] = useState([]);
  const [region, setRegion] = useState("Toshkent");
  const [timeCounter, setTimeCounter] = useState(1);

  useEffect(() => {
    async function getPrayerTime() {
      const result = await api
        .get(`day?region=${region}`)
        .catch((err) => setError(err));
      handleData(result.data.times);
      setDate(formatDate("dd/mm/yy"));
      updateTime();
    }
    getPrayerTime();
  }, []);

  useEffect(() => {
    setTime(getTime());
  }, [timeCounter]);

  function handleData(obj) {
    const prayerTimes = [];
    Object.values(obj).map((value, index) => {
      prayerTimes.push({
        ...prayerTimesIcons[index],
        time: value,
        isCurrent: isCurrentPrayer(value, Object.values(obj)[index + 1]),
      });
    });
    setPrayers(prayerTimes);
  }

  function updateTime() {
    setInterval(() => {
      setTimeCounter((state) => state + 1);
    }, 1000);
  }

  function getTime() {
    const date = new Date();
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    const time = `${date.getHours()} : ${minutes}`;
    return time;
  }

  function formatDate(format) {
    const date = new Date();

    function getMonth() {
      let month = date.getMonth() + 1;
      if (month < 10) {
        month = "0" + month;
      }
      return month;
    }

    const map = {
      mm: getMonth(),
      dd: date.getDate(),
      yy: date.getFullYear().toString().slice(-2),
      yyyy: date.getFullYear(),
    };

    return format.replace(/mm|dd|yy|yyy/gi, (matched) => map[matched]);
  }

  function isCurrentPrayer(prayerTime, nextPrayerTime) {
    let isCurrent = false;
    const currentTime = parseInt(time?.match(/\d/g).join(""));
    const currentPrayer = parseInt(prayerTime.match(/\d/g).join(""));
    const nextPrayer = parseInt(nextPrayerTime?.match(/\d/g).join(""));
    if (
      (currentTime >= currentPrayer && currentTime < nextPrayer) ||
      (currentTime >= currentPrayer && !nextPrayer)
    ) {
      isCurrent = true;
    }
    return isCurrent;
  }

  return (
    <div className="prayer-times">
      <h2 className="title">Namoz Vaqtlari</h2>
      <div className="controls">
        <p className="region">{region}</p>
        <p className="date">{date}</p>
        <p className="time">{time}</p>
      </div>
      <div className="prayer-box">
        {prayers.map((prayer, index) => {
          return (
            <div
              className={prayer.isCurrent ? "prayer prayer-current" : "prayer"}
              key={index}
            >
              <div className="prayer-name">
                <img src={prayer.icon} className="icon" />
                <p className="name">{prayer.name}</p>
              </div>
              <div className="prayer-time">{prayer.time}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PrayerTime;
