import { createSlice } from "@reduxjs/toolkit";

interface SettingsState {
  activation: object;
}

const initialState: SettingsState = {
  activation: {},
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    updateActivation: (state, action) => {
      state.activation = action.payload;
    },
    resetActivation: (state) => {
      state.activation = {};
    },
  },
});

export const { updateActivation, resetActivation } = settingsSlice.actions;
export default settingsSlice.reducer;
