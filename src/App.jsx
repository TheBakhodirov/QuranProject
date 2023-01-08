import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Home from "./pages/home/Home";
import PrayerTime from "./pages/prayer-time/PrayerTime";
import Surah from "./pages/surah/Surah";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/surah" element={<Surah />} />
        <Route path="/prayer" element={<PrayerTime />} />
      </Routes>
    </div>
  );
}

export default App;
