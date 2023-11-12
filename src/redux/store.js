import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import functionsSlice from "./slices/functionsSlice";

export default configureStore({
  reducer: {
    user: userSlice,
    functions: functionsSlice,
  },
});
