import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import loadingReducer from "./loading";
import notificationsReducer from "./notifications";

const store = configureStore({
  reducer: {
    auth: authReducer,
    loading: loadingReducer,
    notifications: notificationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
