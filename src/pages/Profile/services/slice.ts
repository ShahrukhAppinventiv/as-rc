import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getApiCall, postApiCall } from "../../../api/api.method";
import endpoints from "../../../api/api.endpoint";
import { hideLoader, showLoader } from "../../../globalSlice/globalSlice";

const initialValue: any = {
  data: null,
};

export const profileSlice = createSlice({
  name: "profileSlice",
  initialState: initialValue,
  reducers: {
    setProfile: (state) => {
      state;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getProfileDetails.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(getProfileDetails.rejected, (state) => {
        state.data = null;
      });
  },
});

export const getProfileDetails = createAsyncThunk(
  "getProfile",
  async (params, thunkApi) => {
    try {
      thunkApi.dispatch(showLoader());
      const userDetailsResponse = await getApiCall(endpoints.main.profile);
      return userDetailsResponse.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    } finally {
      thunkApi.dispatch(hideLoader());
    }
  },
);

export const updateProfileDetails = createAsyncThunk(
  "updateProfile",
  async (payload: any, thunkApi) => {
    try {
      thunkApi.dispatch(showLoader());
      await postApiCall(endpoints.main.updateProfile, payload);
    } catch (err) {
      console.log(err);
    } finally {
      thunkApi.dispatch(hideLoader());
    }
  },
);

export const { setProfile } = profileSlice.actions;
export default profileSlice.reducer;
