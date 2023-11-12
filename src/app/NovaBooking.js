import { Box } from "@mui/material";
import Navbar from "./NavBar/Navbar";
import HomePage from "./Pages/HomePage/HomePage";

// css
import "src/styles/NovaBooking.css";

const NovaBooking = () => {
  return (
    <Box className="novabooking">
      <Navbar />
      <HomePage />
    </Box>
  );
};

export default NovaBooking;
