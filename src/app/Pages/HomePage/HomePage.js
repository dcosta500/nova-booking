import { Box } from "@mui/material";
import * as React from "react";

import "src/styles/Pages/HomePage/HomePage.css";

const HomePage = () => {
  const [mapImage, setMapImage] = React.useState("library");

  const maps = {
    main: require("src/images/map/ipm-map.png"),
    library: require("src/images/map/ipm-map-library.png"),
    ed2: require("src/images/map/ipm-map-ed2.png"),
  };

  return (
    <Box className="home-page-section">
      <Box className="upcoming-reservations-container"></Box>
      <Box className="map-container">
        <img className="map-image" src={maps[mapImage]} alt="Map" />
      </Box>
      <Box className="select-building-container"></Box>
    </Box>
  );
};

export default HomePage;
