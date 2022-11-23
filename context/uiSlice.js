import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialUiState = { isToggleCart: false };

const uiSlice = createSlice({
  name: "ui",
  initialState: initialUiState,
  reducers: {
    toggleCart(state) {
      state.isToggleCart = !state.isToggleCart;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
