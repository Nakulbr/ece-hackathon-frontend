import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name: "LOADING",
  initialState: {
    isLoading: false,
  },
  reducers: {
    setLoading: (state) => {
      state.isLoading = !state.isLoading;
    },
  },
});

export const { setLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
