import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import functionsSlice from "./slices/functionsSlice";
import pathsSlice from "./slices/pathsSlice";

export default configureStore({
  reducer: {
    user: userSlice,
    functions: functionsSlice,
    paths: pathsSlice,
  },
});
