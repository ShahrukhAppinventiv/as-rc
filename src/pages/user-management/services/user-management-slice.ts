import { createSlice } from "@reduxjs/toolkit";
import {
  getUserDetails,
  getUserList,
  getRolesDropdown,
  updateUserStatus,
  getBranchDropdown,
  addUser,
  editUser,
} from "./action";
import type { UserListResponse } from "./types";
type State = {
  list: UserListResponse | null;
  details: any | null;
  listParams: {
    page: number;
    limit: number;
    search?: string;
    status?: string;
  };
  isFilterApplied: boolean;
  rolesDropdown: [];
  branchDropdown: [];
};

const initialState: State = {
  list: null,
  details: null,
  listParams: { page: 0, limit: 10 },
  isFilterApplied: false,
  rolesDropdown: [],
  branchDropdown: [],
};

const userManagementSlice = createSlice({
  name: "userSlice",
  initialState: initialState,
  reducers: {
    getList: (state, action) => {
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
    resetDetails: (state) => {
      state.details = null;
    },
    resetSearch: (state) => {
      state.listParams.search = "";
    },
    resetAllState: () => initialState,
  },
  extraReducers(builder) {
    builder
      .addCase(getUserList.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.details = action.payload;
      })
      .addCase(updateUserStatus.fulfilled, (state) => {
        state;
      })
      .addCase(getRolesDropdown.fulfilled, (state, action) => {
        state.rolesDropdown = action.payload;
      })
      .addCase(getBranchDropdown.fulfilled, (state, action) => {
        state.branchDropdown = action.payload;
      })
      .addCase(addUser.fulfilled, (state) => {
        state;
      })
      .addCase(editUser.fulfilled, (state) => {
        state;
      });
  },
});

export const {
  getListParams,
  setListParams,
  resetListParams,
  resetDetails,
  addFilter,
  removeFilter,
  resetAllState,
  resetSearch,
} = userManagementSlice.actions;

export default userManagementSlice.reducer;
