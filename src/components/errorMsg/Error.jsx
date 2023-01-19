import React from "react";
import "./style.scss";

const Error = ({ msg }) => {
  return (
    <div className="error-screen">
      <div className="box">
        <p className="icon">
          <i className="bi bi-exclamation-triangle-fill"></i>
        </p>
        <p className="error-msg">{msg}</p>
      </div>
    </div>
  );
};

export default Error;
