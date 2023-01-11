import React from "react";

const Error = ({ msg }) => {
  return (
    <div className="error-box">
      <p className="error-msg">{msg}</p>
    </div>
  );
};

export default Error;
