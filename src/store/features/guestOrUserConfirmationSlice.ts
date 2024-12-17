import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  confirmed: false,
};

const guestOrUserConfirmationSlice = createSlice({
  name: "checkoutPageConfirmation",
  initialState,
  reducers: {
    updateConfirmationStatus: (state) => {
      state.confirmed = true;
    },
  },
});

export default guestOrUserConfirmationSlice.reducer;
export const { updateConfirmationStatus } =
  guestOrUserConfirmationSlice.actions;
