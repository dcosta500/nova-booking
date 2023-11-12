import { Box } from "@mui/material";
import Navbar from "./NavBar/Navbar";
import HomePage from "./Pages/HomePage/HomePage";
import { Route, Routes } from "react-router-dom";

// css
import "src/styles/NovaBooking.css";

const NovaBooking = () => {
  return (
    <Box className="novabooking">
      <Navbar />
      <div className="site-body">
        <Routes>
          <Route path="/nova-booking" element={<HomePage />} />
        </Routes>
      </div>
    </Box>
  );
};

export default NovaBooking;
