import { createSlice } from "@reduxjs/toolkit";

const prefix = "/nova-booking";
const paths = {
  homePage: prefix.concat(""),
  myReservationsPage: prefix.concat("/my-reservations"),
  aboutPage: prefix.concat("/about"),
  profilePage: prefix.concat("/profile"),
  buildings: {
    library: prefix.concat("/buildings/library"),
    ed2: prefix.concat("/buildings/building2"),
  },
};

export const pathsSlice = createSlice({
  name: "paths",
  initialState: {
    homePage: paths.homePage,
    myReservationsPage: paths.myReservationsPage,
    aboutPage: paths.aboutPage,
    profilePage: paths.profilePage,
    libraryPage: paths.buildings.library,
    ed2: paths.buildings.ed2,
  },
  reducers: {},
});

//export const { reducer here } = pathsSlice.actions;

export default pathsSlice.reducer;
