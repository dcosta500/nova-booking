import { Box } from "@mui/material";
import Navbar from "./NavBar/Navbar";
import HomePage from "./Pages/HomePage/HomePage";
import { Route, Routes } from "react-router-dom";

// css
import "src/styles/NovaBooking.css";

const NovaBooking = () => {
  const prefix = "/nova-booking";

  const paths = {
    homePage: prefix.concat(""),
  };

  return (
    <Box className="novabooking">
      <Navbar />
      <div className="site-body">
        <Routes>
          <Route path={paths.homePage} element={<HomePage />} />
        </Routes>
      </div>
    </Box>
  );
};

export default NovaBooking;
