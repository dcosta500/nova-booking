import { createSlice } from "@reduxjs/toolkit";

const prefix = "/nova-booking";
const paths = {
  homePage: prefix.concat(""),
  profilePage: prefix.concat("/profile"),
  aboutPage: prefix.concat("/about"),
  buildings: {
    library: prefix.concat("/buildings/library"),
  },
};

export const pathsSlice = createSlice({
  name: "paths",
  initialState: {
    homePage: paths.homePage,
    profilePage: paths.profilePage,
    aboutPage: paths.aboutPage,
    libraryPage: paths.buildings.library,
  },
  reducers: {},
});

//export const { reducer here } = pathsSlice.actions;

export default pathsSlice.reducer;
