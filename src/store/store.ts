import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "../pages/Profile/services/slice";
import { useSelector, type TypedUseSelectorHook } from "react-redux";
import globalReducer from "../globalSlice/globalSlice";
import customerManagementReducer from "../pages/CustomerManagement/services/slice";
import CmsSlice from "../pages/CMS/service/slice";
import MedicineSlice from "../pages/Medicine/services/slice";

export const store = configureStore({
  reducer: {
    globalSlice: globalReducer,
    profileSlice: profileReducer,
    customerManagementSlice: customerManagementReducer,
    cmsSlice: CmsSlice,
    medicineSlice: MedicineSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
