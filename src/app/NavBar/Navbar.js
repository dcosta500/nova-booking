import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// css
import "src/styles/NavBar/Navbar.css";

const pages = ["Products", "Pricing", "Blog"];

const Navbar = () => {
  const images = {
    logo: require("src/images/typo_logo.png"),
    avatar: require("src/images/profile_freddy.png"),
  };

  const teal = "#456268";

  const buttonTextStyle = {
    fontSize: "1.25rem",
    fontWeight: "500",
  };

  return (
    <Box /* sx={{ border: "1px solid #000" }} */ className="navbar-section">
      <Box className="navbar-container">
        <Box className="logo-container">
          <img className="logo" src={images.logo} />
        </Box>
        <Box className="buttons-container">
          <Typography sx={{ ...buttonTextStyle, color: "white" }}>
            Home
          </Typography>
          <Typography sx={{ ...buttonTextStyle, color: teal }}>
            Reservations
          </Typography>
          <Typography sx={{ ...buttonTextStyle, color: teal }}>
            About
          </Typography>
        </Box>
        <Box className="avatar-container">
          <img className="avatar" src={images.avatar} alt="Avatar" />
        </Box>
      </Box>
    </Box>
  );
};
export default Navbar;
