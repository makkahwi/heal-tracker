import { createSlice } from "@reduxjs/toolkit";
import {
  initialServiceActivationState,
  serviceActivationProps,
} from "../Views/Auth/Settings/ServicesActivation";

interface SettingsState {
  activation: serviceActivationProps;
}

const initialState: SettingsState = {
  activation: JSON.parse(
    localStorage.getItem("activation") ||
      JSON.stringify(initialServiceActivationState)
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
      state.activation = initialServiceActivationState;
    },
  },
});

export const { updateActivation, resetActivation } = settingsSlice.actions;
export default settingsSlice.reducer;
