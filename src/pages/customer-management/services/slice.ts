import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getApiCall, putApiCall } from "../../../api/api.method";
import endpoints from "../../../api/api.endpoint";
import { hideLoader, showLoader } from "../../../globalSlice/globalSlice";
import type { Customer, CustomerListApiResponse } from "./type";

type State = {
  list: CustomerListApiResponse | null;
  details: Customer | null;
  listParams: {
    page: number;
    limit: number;
    search?: string;
    status?: string;
  };
  isFilterApplied: boolean;
};

const initialState: State = {
  list: null,
  details: null,
  listParams: { page: 0, limit: 10 },
  isFilterApplied: false,
};
const customerManagementSlice = createSlice({
  name: "customerManagementSlice",
  initialState: initialState,
  reducers: {
    customerList: (state, action) => {
      state.list = action.payload;
    },
    getListParams: (state) => {
      state.listParams;
    },
    setListParams: (state, action) => {
      state.listParams = action.payload;
    },
    resetListParams: (state) => {
      state.listParams = { page: 0, limit: 10, search: "" };
    },
    addFilter: (state) => {
      state.isFilterApplied = true;
    },
    removeFilter: (state) => {
      state.isFilterApplied = false;
    },
    resetCustomerDetails: (state) => {
      state.details = null;
    },
    resetSearch: (state) => {
      state.listParams.search = "";
    },
    resetCustomerState: () => initialState,
  },
  extraReducers(builder) {
    builder
      .addCase(getcustomerDetails.fulfilled, (state, action) => {
        state.details = action.payload;
      })
      .addCase(getcustomerDetails.rejected, (state) => {
        state.details = null;
      })
      .addCase(updatecustomerStatus.fulfilled, (state) => {
        state;
      })
      .addCase(updatecustomerStatus.rejected, (state) => state)
      .addCase(getcustomerList.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(getcustomerList.rejected, (state) => {
        state.list = null;
      });
  },
});

export const getcustomerDetails = createAsyncThunk(
  "customerDetails",
  async (params: any, thunkApi) => {
    try {
      thunkApi.dispatch(showLoader());
      const userDetailsResponse = await getApiCall(
        endpoints.main.customerDetails,
        params,
      );
      return userDetailsResponse.data.data.resObj;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    } finally {
      thunkApi.dispatch(hideLoader());
    }
  },
);

export const getcustomerList = createAsyncThunk(
  "customerList",
  async (params: any, thunkApi) => {
    try {
      thunkApi.dispatch(showLoader());
      const userDetailsResponse = await getApiCall(
        endpoints.main.customerListing,
        params,
      );
      console.log(userDetailsResponse.data);
      return userDetailsResponse.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    } finally {
      thunkApi.dispatch(hideLoader());
    }
  },
);

export const updatecustomerStatus = createAsyncThunk(
  "updatecustomerStatus",
  async (params: any, thunkApi) => {
    try {
      thunkApi.dispatch(showLoader());
      const userDetailsResponse = await putApiCall(
        endpoints.main.customerStatusUpdate,
        params,
      );
      return userDetailsResponse.data.data.resObj;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    } finally {
      thunkApi.dispatch(hideLoader());
    }
  },
);

export const {
  getListParams,
  setListParams,
  resetListParams,
  resetCustomerDetails,
  addFilter,
  removeFilter,
  resetCustomerState,
  resetSearch,
} = customerManagementSlice.actions;

export default customerManagementSlice.reducer;
