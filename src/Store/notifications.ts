import { createSlice } from "@reduxjs/toolkit";

interface NotificationsState {
  notifications: { msg: string; err?: boolean }[];
}

const initialState: NotificationsState = {
  notifications: [],
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotifications: (state, action) => {
      state.notifications.push(action.payload);
      console.log("Added notifications:", action.payload);
    },
    removeNotifications: (state, action) => {
      state.notifications = state.notifications.filter(
        ({ msg }) => msg !== action.payload.msg
      );
      console.log("Removed notifications:", action.payload);
    },
    resetNotifications: (state) => {
      state.notifications = [];
    },
  },
});

export const { addNotifications, removeNotifications, resetNotifications } =
  notificationsSlice.actions;
export default notificationsSlice.reducer;
