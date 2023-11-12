import { Box, Typography } from "@mui/material";
import * as React from "react";
import ContentColumn from "./ContentColumn";

// css
import "src/styles/Pages/HomePage/HomePage.css";

const HomePage = () => {
  const [mapImage, setMapImage] = React.useState("main");

  const maps = {
    main: require("src/images/map/ipm-map.png"),
    library: require("src/images/map/ipm-map-library.png"),
    ed2: require("src/images/map/ipm-map-ed2.png"),
  };

  const styles = {
    columnTitleStyle: {
      fontSize: "1.5rem",
      fontWeight: "500",
      color: "white",
    },
    upcomingReservationsNoneStyle: {
      fontSize: "1.5rem",
      fontWeight: "500",
      color: "#7c7c7c",
    },
  };

  let upcomingReservationsColumn = {
    title: "Upcoming Reservations",
    content: undefined,
  };

  let selectBuildingColumn = {
    title: "Select Building",
    content: undefined,
  };

  return (
    <Box className="home-page-section">
      <ContentColumn title="Upcoming Reservations">
        {upcomingReservationsColumn.content}
      </ContentColumn>
      <Box className="map-container">
        <img className="map-image" src={maps[mapImage]} alt="Map" />
      </Box>
      <ContentColumn title="Select Building">
        {selectBuildingColumn.content}
      </ContentColumn>
    </Box>
  );
};

export default HomePage;
