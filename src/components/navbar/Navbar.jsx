import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import "./style.scss";

const Navbar = () => {
  const location = useLocation();
  const [url, setUrl] = useState(window.location.href);
  const origin = `${window.location.origin}/`;
  console.log(location);

  useEffect(() => {
    setUrl(window.location.href);
    // console.log(url);
  }, [location]);

  return url !== origin ? <div className="navbar">Navbar</div> : null;
};

export default Navbar;
