import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";

const Home = () => {
  return (
    <div className="homepage">
      <h1 className="logo">Al Qur'an</h1>
      <div className="links">
        <Link to={"/surah"}>
          <div className="link-btn surah-btn">
            <img src="https://i0.wp.com/www.godhdwallpapers.com/wallpapers/2018/11/quran-wallpaper-image-gallery.jpg" />
            <p>Qur'on suralari</p>
          </div>
        </Link>
        <Link to={"/prayer"}>
          <div className="link-btn prayer-btn">
            <img src="https://w0.peakpx.com/wallpaper/324/883/HD-wallpaper-muslims-prayers-black-and-white-islamic-man-muslim-prayer.jpg" />
            <p>Namoz vaqtlari</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
