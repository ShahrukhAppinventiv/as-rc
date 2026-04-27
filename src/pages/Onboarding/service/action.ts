import endpoints from "@api/api.endpoint";
import { postApiCall } from "@api/api.method";
import { hideLoader, showLoader } from "@globalSlice/globalSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const login = createAsyncThunk(
  "login",
  async (payload: any, thunkApi) => {
    try {
      thunkApi.dispatch(showLoader());
      const loginResponse = await postApiCall(endpoints.auth.login, payload);
      console.log(loginResponse);
      localStorage.setItem("token", loginResponse?.data.accessToken);
      return loginResponse;
    } catch (err) {
      return thunkApi.rejectWithValue(err?.response?.data || err.message);
    } finally {
      thunkApi.dispatch(hideLoader());
    }
  },
);

export const forgot = createAsyncThunk(
  "forgot",
  async (payload: any, thunkApi) => {
    try {
      thunkApi.dispatch(showLoader());
      const forgotResponse = await postApiCall(
        endpoints.auth.forgotPpassword,
        payload,
      );
      return forgotResponse.data;
    } catch (err) {
    } finally {
      thunkApi.dispatch(hideLoader());
    }
  },
);

export const verfiyOTP = createAsyncThunk(
  "verfiyOTP",
  async (payload: any, thunkApi) => {
    try {
      thunkApi.dispatch(showLoader());
      const verifyOtpResponse = await postApiCall(
        endpoints.auth.verifyOTP,
        payload,
      );
      return verifyOtpResponse.data;
    } catch (err) {
    } finally {
      thunkApi.dispatch(hideLoader());
    }
  },
);

export const resetPassword = createAsyncThunk(
  "resetPassword",
  async (payload: any, thunkApi) => {
    try {
      thunkApi.dispatch(showLoader());
      const resetPasswordResponse = await postApiCall(
        endpoints.auth.resetPassword,
        payload,
      );
      return resetPasswordResponse.data;
    } catch (err) {
    } finally {
      thunkApi.dispatch(hideLoader());
    }
  },
);
