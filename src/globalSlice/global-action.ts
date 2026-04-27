import { createAsyncThunk } from "@reduxjs/toolkit";
import { hideLoader, showLoader } from "./globalSlice";
import { postApiCall } from "@api/api.method";
import endpoints from "@api/api.endpoint";

export const getPresignedUrl = createAsyncThunk(
  "getPresignedUrl",
  async (payload: any, thunkApi) => {
    try {
      thunkApi.dispatch(showLoader());
      const response = await postApiCall(
        endpoints.common.presignedUrl,
        payload,
      );
      return response.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    } finally {
      thunkApi.dispatch(hideLoader());
    }
  },
);