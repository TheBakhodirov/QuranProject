import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Player from "./components/audioPlayer/Player";
import Home from "./pages/home/Home";
import PrayerTime from "./pages/prayer-time/PrayerTimePage";
import Surah from "./pages/surah/Surah";
import Surahs from "./pages/surahs/Surahs";

function App() {
  const { showPlayer } = useSelector((state) => state.player);

  const style = {
    paddingBottom: showPlayer ? "7rem" : "1rem",
  };

  return (
    <div className="App" style={style}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/surah" element={<Surahs />} />
        <Route path="/surah/:id" element={<Surah />} />
        <Route path="/prayer" element={<PrayerTime />} />
      </Routes>
      <Player />
    </div>
  );
}

export default App;
