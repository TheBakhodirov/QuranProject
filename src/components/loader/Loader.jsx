import React from "react";
import ReactLoading from "react-loading";
import "./style.scss";

const Loader = ({ width, height, type, color }) => (
  <ReactLoading type={type} color={color} height={height} width={width} />
);

const LoaderWithWrapper = ({ width, height, type, color }) => (
  <div className="loading-screen">
    <ReactLoading type={type} color={color} height={height} width={width} />
  </div>
);

// const Loaders = { Loader, LoaderWithWrapper };

export { Loader, LoaderWithWrapper };
