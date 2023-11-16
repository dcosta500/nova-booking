import { createSlice } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

const redirectTo = (path) => alert("Deprecated! change redirect function.");

export const functionsSlice = createSlice({
  name: "functions",
  initialState: {
    redirectTo: redirectTo,
  },
  reducers: {},
});

//export const { reducer here } = functionsSlice.actions;

export default functionsSlice.reducer;
