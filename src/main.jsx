import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import Navbar from "./components/navbar/Navbar";
import "./index.css";
import store from "./redux/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <React.StrictMode>
        <Navbar />
        <App />
      </React.StrictMode>
    </Provider>
  </BrowserRouter>
);
