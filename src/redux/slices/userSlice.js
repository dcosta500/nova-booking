import { createSlice, current } from "@reduxjs/toolkit";
import { enableMapSet } from "immer";

// Enable the MapSet plugin
enableMapSet();

export const userSlice = createSlice({
  name: "user",
  initialState: {
    name: undefined,
    reservations: new Map(), // [{id, reservations}]
  },
  reducers: {
    updateName: (state, action) => {
      // if (action.payload === undefined) state.reservations = [];
      state.name = action.payload;
    },
    addReservation: (state, action) => {
      // reservation: {buildingId, itemId, date, quantity}
      if (
        current(state).name !== undefined &&
        action.payload.date !== undefined
      ) {
        if (!state.reservations.has(state.name))
          state.reservations.set(state.name, []);

        let res = state.reservations.get(state.name);

        res.push(action.payload);

        res.sort((a, b) => {
          return a.date.isBefore(b.date) ? -1 : 1;
        });
      }
    },
    cancelReservation: (state, action) => {
      // reservation: {buildingId, itemId, date, quantity}
      const payload = action.payload;
      if (state.name !== undefined && payload.date !== undefined) {
        let res = state.reservations.get(state.name);

        let resCpy = current(res);

        let idx = resCpy.indexOf(payload);

        if (idx < 0) return;

        res = res.splice(idx, 1);
      }
    },
  },
});

export const { updateName, addReservation, cancelReservation } =
  userSlice.actions;

export default userSlice.reducer;
