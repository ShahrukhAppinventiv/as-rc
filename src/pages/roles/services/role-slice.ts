import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getApiCall, postApiCall, putApiCall } from "../../../api/api.method";
import endpoints from "../../../api/api.endpoint";
import { hideLoader, showLoader } from "../../../globalSlice/globalSlice";
import type { RoleListResponse } from "./types";
type State = {
  list: RoleListResponse | null;
  permissionList: [];
  details: any | null;
  listParams: {
    page: number;
    limit: number;
    search?: string;
    status?: string;
  };
};

const initialState: State = {
  list: null,
  details: null,
  listParams: { page: 0, limit: 10 },
  permissionList: [],
};

const RoleSlice = createSlice({
  name: "RoleSlice",
  initialState: initialState,
  reducers: {
    getRoleListParams: (state) => {
      state.listParams;
    },
    setRoleListParams: (state, action) => {
      state.listParams = action.payload;
    },
    resetRoleListParams: (state) => {
      state.listParams = { page: 0, limit: 10, search: "" };
    },
    resetRoleDetails: (state) => {
      state.details = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getRoleListing.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(getPermissionsListing.fulfilled, (state, action) => {
        state.permissionList = action.payload;
      })
      .addCase(addRole.fulfilled, (state) => state)
      .addCase(getRoleDetails.fulfilled, (state, action) => {
        state.details = action.payload;
      })
      .addCase(updateRole.fulfilled, (state) => state);
  },
});

export const getRoleListing = createAsyncThunk(
  "roleListing",
  async (params: any, thunkApi) => {
    try {
      thunkApi.dispatch(showLoader());
      const roleListingResponse = await getApiCall(
        endpoints.main.roles,
        params,
      );
      return roleListingResponse;
    } catch (err) {
    } finally {
      thunkApi.dispatch(hideLoader());
    }
  },
);

export const addRole = createAsyncThunk(
  "addRole",
  async (payload: any, thunkApi) => {
    try {
      thunkApi.dispatch(showLoader());
      const roleListingResponse = await postApiCall(
        endpoints.main.roles,
        payload,
      );
      console.log(roleListingResponse.data);
      return roleListingResponse.data;
    } catch (err) {
    } finally {
      thunkApi.dispatch(hideLoader());
    }
  },
);

export const updateRole = createAsyncThunk(
  "updateRole",
  async (payload: any, thunkApi) => {
    try {
      const { id } = payload;
      delete payload.id;
      thunkApi.dispatch(showLoader());
      const res = await putApiCall(`${endpoints.main.roles}/${id}`, payload);
      return res.data.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    } finally {
      thunkApi.dispatch(hideLoader());
    }
  },
);

export const getRoleDetails = createAsyncThunk(
  "roleDetails",
  async (params: any, thunkApi) => {
    try {
      thunkApi.dispatch(showLoader());
      const roleDetailsResponse = await getApiCall(
        `${endpoints.main.roles}/${params.id}`,
      );
      return roleDetailsResponse.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    } finally {
      thunkApi.dispatch(hideLoader());
    }
  },
);

export const getPermissionsListing = createAsyncThunk(
  "getPermissionListing",
  async (params: any, thunkApi) => {
    try {
      thunkApi.dispatch(showLoader());
      const response = await getApiCall(endpoints.main.permissionsListing);
      return response.data;
    } catch (err) {
    } finally {
      thunkApi.dispatch(hideLoader());
    }
  },
);

export const {
  getRoleListParams,
  setRoleListParams,
  resetRoleListParams,
  resetRoleDetails,
} = RoleSlice.actions;

export default RoleSlice.reducer;
