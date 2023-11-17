import { createSlice, current } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    name: undefined,
    reservations: [],
  },
  reducers: {
    updateName: (state, action) => {
      if (action.payload === undefined) state.reservations = [];
      state.name = action.payload;
    },
    addReservation: (state, action) => {
      // reservation: {buildingId, itemId, date, quantity}
      if (
        current(state).name !== undefined &&
        action.payload.date !== undefined
      ) {
        state.reservations.push(action.payload);

        state.reservations.sort((a, b) => {
          return a.date.isBefore(b.date) ? -1 : 1;
        });
      }
    },
  },
});

export const { updateName, addReservation } = userSlice.actions;

export default userSlice.reducer;
