import endpoints from "@api/api.endpoint";
import { getApiCall, postApiCall, putApiCall } from "@api/api.method";
import { hideLoader, showLoader } from "@globalSlice/globalSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUserList = createAsyncThunk(
  "userList",
  async (params: any, thunkApi) => {
    try {
      thunkApi.dispatch(showLoader());
      const userDetailsResponse = await getApiCall(endpoints.main.user, params);
      return userDetailsResponse.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    } finally {
      thunkApi.dispatch(hideLoader());
    }
  },
);

export const addUser = createAsyncThunk(
  "addUser",
  async (payload: any, thunkApi) => {
    try {
      thunkApi.dispatch(showLoader());
      const userDetailsResponse = await postApiCall(
        endpoints.main.user,
        payload,
      );
      return userDetailsResponse.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    } finally {
      thunkApi.dispatch(hideLoader());
    }
  },
);

export const editUser = createAsyncThunk(
  "editUser",
  async (payload: any, thunkApi) => {
    try {
      thunkApi.dispatch(showLoader());
      const { id } = payload;
      delete payload.id;
      const userDetailsResponse = await putApiCall(
        `${endpoints.main.user}/${id}`,
        payload,
      );
      return userDetailsResponse.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    } finally {
      thunkApi.dispatch(hideLoader());
    }
  },
);

export const getRolesDropdown = createAsyncThunk(
  "getRolesDropdown",
  async (params: any, thunkApi) => {
    try {
      thunkApi.dispatch(showLoader());
      const userDetailsResponse = await getApiCall(
        endpoints.main.rolesDropdown,
      );
      return userDetailsResponse.data.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    } finally {
      thunkApi.dispatch(hideLoader());
    }
  },
);
export const getBranchDropdown = createAsyncThunk(
  "getBranchDropdown",
  async (params: any, thunkApi) => {
    try {
      thunkApi.dispatch(showLoader());
      const userDetailsResponse = await getApiCall(
        endpoints.main.branchDropwon,
      );
      return userDetailsResponse.data.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    } finally {
      thunkApi.dispatch(hideLoader());
    }
  },
);

export const getUserDetails = createAsyncThunk(
  "userDetails",
  async (params: any, thunkApi) => {
    try {
      thunkApi.dispatch(showLoader());
      const response = await getApiCall(`${endpoints.main.user}/${params.id}`);
      return response.data.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    } finally {
      thunkApi.dispatch(hideLoader());
    }
  },
);

export const updateUserStatus = createAsyncThunk(
  "updateUserStatus",
  async (params: any, thunkApi) => {
    try {
      thunkApi.dispatch(showLoader());
      const userDetailsResponse = await putApiCall(
        `${endpoints.main.userStatusUpdate}/${params.id}/${params.status}`,
      );
      return userDetailsResponse.data.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    } finally {
      thunkApi.dispatch(hideLoader());
    }
  },
);
