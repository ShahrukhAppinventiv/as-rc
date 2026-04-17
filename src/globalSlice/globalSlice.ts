import { createSlice } from "@reduxjs/toolkit";
const initialValue = {
  loader: {
    isShowLoader: false,
  },
};

export const globalSlice = createSlice({
  name: "globalSlice",
  initialState: initialValue,
  reducers: {
    showLoader: (state) => {
      state.loader.isShowLoader = true;
    },
    hideLoader: (state) => {
      state.loader.isShowLoader = false;
    },
  },
});

export const { showLoader, hideLoader } = globalSlice.actions;

export default globalSlice.reducer;
