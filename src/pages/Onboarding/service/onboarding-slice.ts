import { createSlice } from "@reduxjs/toolkit";
import { forgot, login, resetPassword, verfiyOTP } from "./action";

const onBoardingSlice = createSlice({
  name: "onBoardingSlice",
  initialState: null,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(login.fulfilled, (state) => state);
    builder.addCase(login.rejected, (state) => state);
    builder.addCase(forgot.fulfilled, (state) => state);
    builder.addCase(verfiyOTP.fulfilled, (state) => state);
    builder.addCase(resetPassword.fulfilled, (state) => state);
  },
});

export default onBoardingSlice.reducer;
