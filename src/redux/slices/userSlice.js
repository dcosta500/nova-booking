import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    name: undefined,
  },
  reducers: {
    updateName: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const { updateName } = userSlice.actions;

export default userSlice.reducer;
