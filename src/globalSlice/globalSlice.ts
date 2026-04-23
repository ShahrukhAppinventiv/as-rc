import { createSlice } from "@reduxjs/toolkit";
import { getPresignedUrl } from "./global-action";
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
  extraReducers(builder) {
    builder.addCase(getPresignedUrl.fulfilled, (state) => {
      state;
    });
  },
});

export const { showLoader, hideLoader } = globalSlice.actions;

export default globalSlice.reducer;
