import { createSlice } from "@reduxjs/toolkit";

interface SettingsState {
  settings: { activation: object };
}

const initialState: SettingsState = {
  settings: { activation: {} },
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    addSettings: (state, action) => {
      state.settings.activation = action.payload;
    },
    resetSettings: (state) => {
      state.settings.activation = {};
    },
  },
});

export const { addSettings, resetSettings } = settingsSlice.actions;
export default settingsSlice.reducer;
