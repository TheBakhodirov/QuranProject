import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./style.scss";

const Navbar = () => {
  const location = useLocation();
  const [url, setUrl] = useState(window.location.href);
  const origin = `${window.location.origin}/`;

  const navigate = useNavigate();

  useEffect(() => {
    setUrl(window.location.href);
  }, [location]);

  const Nav = () => {
    return (
      <div className="navbar">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <i className="bi bi-chevron-left"></i>
        </button>
        <button className="home-btn" onClick={() => navigate("/")}>
          <i className="bi bi-house-fill"></i>
        </button>
      </div>
    );
  };

  return url !== origin ? <Nav /> : null;
};

export default Navbar;
