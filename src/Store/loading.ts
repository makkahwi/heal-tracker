import { createSlice } from "@reduxjs/toolkit";

interface LoadingState {
  loading: boolean[];
}

const initialState: LoadingState = {
  loading: [],
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    addLoading: (state) => {
      state.loading.push(true);
      console.log("Added loading:", state.loading);
    },
    removeLoading: (state) => {
      if (state.loading.length > 0) {
        state.loading.pop();
        console.log("Removed loading:", state.loading);
      } else {
        console.warn("No loading state to remove.");
      }
    },
    resetLoading: (state) => {
      state.loading = [];
      console.log("Reset loading:", state.loading);
    },
  },
});

export const { addLoading, removeLoading, resetLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
