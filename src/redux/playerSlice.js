import { createSlice } from "@reduxjs/toolkit";

const playerSlice = createSlice({
  name: "player",
  initialState: {
    audioArray: [],
    showPlayer: false,
    currentSurah: "",
    currentSurahNumber: 0,
    currentAudio: null,
    currentAudioNumber: 0,
    isPlaying: false,
    playingSurah: false,
  },
  reducers: {
    showPlayer(state) {
      state.showPlayer = true;
    },
    closePlayer(state) {
      state.showPlayer = false;
      state.isPlaying = false;
      state.currentSurahNumber = 0;
      state.currentAudioNumber = 0;
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
    },
    setPause(state, { payload }) {
      state.paused = payload;
    },
    play(state) {
      state.isPlaying = true;
      state.paused = false;
    },
    pause(state) {
      state.isPlaying = false;
    },
    setPlayingSurah(state, { payload }) {
      state.playingSurah = payload;
    },
  },
});

export const playerActions = playerSlice.actions;
export default playerSlice;
