import { Box, Typography } from "@mui/material";
import * as React from "react";

import "src/styles/Pages/HomePage/HomePage.css";

const HomePage = () => {
  const [mapImage, setMapImage] = React.useState("main");

  const maps = {
    main: require("src/images/map/ipm-map.png"),
    library: require("src/images/map/ipm-map-library.png"),
    ed2: require("src/images/map/ipm-map-ed2.png"),
  };

  const columnTitleStyle = {
    fontSize: "1.5rem",
    fontWeight: "500",
    color: "white",
  };

  const upcomingReservationsNoneStyle = {
    fontSize: "1.5rem",
    fontWeight: "500",
    color: "#7c7c7c",
  };

  return (
    <Box className="home-page-section">
      <Box className="column upcoming-reservations-container">
        <Box className="column-title">
          <Typography sx={{ ...columnTitleStyle }}>
            Upcoming Reservations
          </Typography>
        </Box>
        <Box className="upcoming-reservations-none-container">
          <Typography sx={{ ...upcomingReservationsNoneStyle }}>
            None
          </Typography>
        </Box>
        {/* <Box className="upcoming-reservations-list-container">
          <Typography sx={{ ...upcomingReservationsNoneStyle }}>
            TODO: PUT CONTENT HERE DYNAMICALLY
          </Typography>
        </Box> */}
      </Box>
      <Box className="map-container">
        <img className="map-image" src={maps[mapImage]} alt="Map" />
      </Box>
      <Box className="column select-building-container">
        <Box className="column-title">
          <Typography sx={{ ...columnTitleStyle }}>Select Building</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
