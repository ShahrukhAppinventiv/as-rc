import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getApiCall, putApiCall } from "../../../api/api.method";
import endpoints from "../../../api/api.endpoint";
import { hideLoader, showLoader } from "../../../globalSlice/globalSlice";
import type { CmsType } from "./typs";

const cmsSlice = createSlice({
  name: "cmsSlice",
  initialState: {
    PRIVACY_POLICY: {},
    TERMS_CONDITIONS: {},
    ABOUT_US: {},
  },
  reducers: {
    setCmsInitialState: (state) =>
      (state = {
        PRIVACY_POLICY: {},
        TERMS_CONDITIONS: {},
        ABOUT_US: {},
      }),
  },
  extraReducers(builder) {
    builder
      .addCase(getCmsData.fulfilled, (state, action) => {
        console.log("Action====>", action);
        const type = action.meta.arg as CmsType;
        state[type] = action.payload;
        console.log("State--->", state);
      })
      .addCase(getCmsData.rejected, (state) => {
        // state = null;
      });
  },
});

export const getCmsData = createAsyncThunk(
  "cmsData",
  async (contentType: string, thunkApi) => {
    try {
      thunkApi.dispatch(showLoader());
      const cmsResponse = await getApiCall(endpoints.main.cms, {
        contentType,
      });
      return cmsResponse.data.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    } finally {
      thunkApi.dispatch(hideLoader());
    }
  },
);

export const updateCMSData = createAsyncThunk(
  "updateCmsData",
  async (payload: any, thunkApi) => {
    try {
      thunkApi.dispatch(showLoader());
      await putApiCall(endpoints.main.cms, payload);
      return { success: true };
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    } finally {
      thunkApi.dispatch(hideLoader());
    }
  },
);

export const { setCmsInitialState } = cmsSlice.actions;
export default cmsSlice.reducer;
