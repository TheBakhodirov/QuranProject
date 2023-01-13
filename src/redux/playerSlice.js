import { createSlice } from "@reduxjs/toolkit";

const playerSlice = createSlice({
  name: "player",
  initialState: {
    audioArray: [],
    showPlayer: false,
    currentSurah: "",
    currentSurahNumber: 1,
    currentAudio: null,
    currentAudioNumber: 0,
    isPlaying: false,
    paused: true,
    playingSurah: false,
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
    setCurrentSurahName(state, { payload }) {
      state.currentSurah = payload;
    },
    setCurrentSurahNumber(state, { payload }) {
      state.currentSurahNumber = payload;
    },
    setCurrentAudio(state, { payload }) {
      state.currentAudio = payload;
    },
    setCurrentAudioNumber(state, { payload }) {
      state.currentAudioNumber = payload;
      console.log(payload.audio, payload.number);
    },
    setPause(state, { payload }) {
      state.paused = payload;
    },
    play(state) {
      state.isPlaying = true;
      state.paused = false;
      console.log("isplaying ---", state.isPlaying, "paused ---", state.paused);
    },
    stop(state) {
      state.isPlaying = false;
      console.log(state.isPlaying);
    },
    setPlayingSurah(state, { payload }) {
      state.playingSurah = payload;
    },
  },
});

export const playerActions = playerSlice.actions;
export default playerSlice;
