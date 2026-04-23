import { configureStore,combineReducers } from "@reduxjs/toolkit";
import { useSelector, type TypedUseSelectorHook } from "react-redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import profileReducer from "../pages/Profile/services/slice";
import globalReducer from "../globalSlice/globalSlice";
import customerManagementReducer from "../pages/customer-management/services/slice";
import CmsSlice from "../pages/cms/service/slice";
import MedicineSlice from "../pages/Medicine/services/slice";
import RoleSlice from "../pages/roles/services/role-slice";
import UserManagementSlice from "../pages/user-management/services/user-management-slice"

// const persistConfig = {
//   key: "root",
//   storage,
//   whitelist: ["customerManagementSlice"],
// };


const customerPersistConfig = {
  key: "customerManagement",
  storage,
};


const persistedCustomerReducer = persistReducer(
  customerPersistConfig,
  customerManagementReducer
);


const rootReducer = combineReducers({
  globalSlice: globalReducer,
  profileSlice: profileReducer,
  customerManagementSlice: persistedCustomerReducer,
  cmsSlice: CmsSlice,
  medicineSlice: MedicineSlice,
  roleSlice: RoleSlice,
  userManagementSlice: UserManagementSlice
});

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: rootReducer,
// });
export const store = configureStore({
  reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
      },
    }),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
