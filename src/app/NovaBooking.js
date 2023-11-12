import { Box } from "@mui/material";
import Navbar from "./NavBar/Navbar";
import HomePage from "./Pages/HomePage/HomePage";
import { Route, Routes } from "react-router-dom";

// css
import "./NovaBooking.css";
import ProfilePage from "./Pages/Profile/ProfilePage";

const NovaBooking = () => {
  const prefix = "/nova-booking";

  const paths = {
    homePage: prefix.concat(""),
    profilePage: prefix.concat("/profile"),
  };

  return (
    <Box className="novabooking">
      <Navbar />
      <div className="site-body">
        <Routes>
          <Route path={paths.homePage} element={<HomePage />} />
          <Route path={paths.profilePage} element={<ProfilePage />} />
        </Routes>
      </div>
    </Box>
  );
};

export default NovaBooking;
