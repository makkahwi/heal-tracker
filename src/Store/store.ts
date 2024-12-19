import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import loadingReducer from "./loading";

const store = configureStore({
  reducer: {
    auth: authReducer,
    loading: loadingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
