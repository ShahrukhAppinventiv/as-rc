import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postApiCall } from "../../../api/api.method";
import endpoints from "../../../api/api.endpoint";
import { hideLoader, showLoader } from "../../../globalSlice/globalSlice";

const initialState: any = {
  medicineList: {},
};

const medicineSlice = createSlice({
  name: "medincineSlice",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getMedicineList.fulfilled, (state, action) => {
        state.medicineList = action.payload || {};
      })
      .addCase(getMedicineList.rejected, (state) => {
        state.medicineList = {};
      });
  },
});

export const getMedicineList = createAsyncThunk(
  "getMedicine",
  async (params:any, thunkApi) => {
    try {
      thunkApi.dispatch(showLoader());
      const medicineResponse = await postApiCall(
        endpoints.main.medicine,
        params,
      );
      return medicineResponse?.data;
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      thunkApi.dispatch(hideLoader());
    }
  },
);

export default medicineSlice.reducer;
