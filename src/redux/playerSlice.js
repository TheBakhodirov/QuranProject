import { createSlice } from "@reduxjs/toolkit";

const playerSlice = createSlice({
  name: "player",
  initialState: {
    audioArray: [],
    showPlayer: false,
    currentAudio: null,
    isPlaying: false,
  },
  reducers: {
    showPlayer(state) {
      state.showPlayer = true;
    },
    hidePlayer(state) {
      state.showPlayer = false;
    },
    setAudios(state, { payload }) {
      state.audioArray = payload;
    },
    setCurrentAudio(state, { payload }) {
      state.currentAudio = payload;
      console.log(payload);
    },
    play(state) {
      state.isPlaying = true;
      console.log(state.isPlaying);
    },
    stop(state) {
      state.isPlaying = false;
      console.log(state.isPlaying);
    },
  },
});

export const playerActions = playerSlice.actions;
export default playerSlice;
