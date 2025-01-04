import { createSlice } from "@reduxjs/toolkit";
import { initialSettings, settingProps } from "../Views/Auth/Settings";

interface SettingsState {
  activation: settingProps;
}

const initialState: SettingsState = {
  activation: JSON.parse(
    localStorage.getItem("activation") || JSON.stringify(initialSettings)
  ),
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    updateActivation: (state, action) => {
      localStorage.setItem("activation", JSON.stringify(action.payload));

      state.activation = action.payload;
    },
    resetActivation: (state) => {
      state.activation = initialSettings;
    },
  },
});

export const { updateActivation, resetActivation } = settingsSlice.actions;
export default settingsSlice.reducer;
