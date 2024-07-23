import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import firestoreReducer from "./firestoreSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    firestore: firestoreReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
