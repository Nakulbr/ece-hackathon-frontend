import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "./loading/loadingSlice";
import userReducer from "./user/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    loading: loadingReducer,
  },
});
