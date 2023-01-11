import { createSlice } from "@reduxjs/toolkit";

const surah = createSlice({
  name: "surah",
  initialState: {
    success: false,
    error: false,
    loading: false,
  },
  reducers: {
    getSurahStart(state) {
      state.loading = true;
    },
    getSurahSuccess(state) {
      state.loading = false;
      state.success = true;
    },
    getSurahFail(state, { payload }) {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const surahActions = surah.actions;
export default surah;
