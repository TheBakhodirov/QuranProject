import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import Navbar from "./components/navbar/Navbar";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <React.StrictMode>
      <Navbar />
      <App />
    </React.StrictMode>
  </BrowserRouter>
);
