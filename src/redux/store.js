import { configureStore } from "@reduxjs/toolkit";
import playerSlice from "./playerSlice";
import surah from "./surahSlice";

const store = configureStore({
  reducer: {
    player: playerSlice.reducer,
    surah: surah.reducer,
  },
});

export default store;
