import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import loadingReducer from "./loading";
import notificationsReducer from "./notifications";
import settingsReducer from "./settings";

const store = configureStore({
  reducer: {
    auth: authReducer,
    loading: loadingReducer,
    notifications: notificationsReducer,
    settings: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
