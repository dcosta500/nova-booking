import { createSlice } from "@reduxjs/toolkit";

const redirectTo = (path) => {
  window.location.href = path;
};

export const functionsSlice = createSlice({
  name: "functions",
  initialState: {
    redirectTo: redirectTo,
  },
  reducers: {},
});

//export const { reducer here } = functionsSlice.actions;

export default functionsSlice.reducer;
