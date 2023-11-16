import { Box, Button, List, ListItem } from "@mui/material";
import * as React from "react";
import ContentColumn from "./ContentColumn";

// css
import "./HomePage.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const paths = useSelector((store) => store.paths);
  const navigate = useNavigate();
  const [mapImage, setMapImage] = React.useState("main");

  const maps = {
    main: require("src/images/map/ipm-map.png"),
    library: require("src/images/map/ipm-map-library.png"),
    ed2: require("src/images/map/ipm-map-ed2.png"),
  };

  const buttonListStyle = {
    overflowY: "scroll",
  };

  const buildings = [
    {
      name: "Biblioteca",
      mapName: "library",
      path: paths.libraryPage,
    },
    {
      name: "Edifício 2",
      mapName: "ed2",
      path: paths.homePage,
    },
  ];

  let upcomingReservationsColumn = {
    title: "Upcoming Reservations",
    content: undefined,
  };

  let selectBuildingColumn = {
    title: "Select a Building",
    content: (
      <List sx={buttonListStyle}>
        {buildings.map((building, key) => (
          <ListItem key={key}>
            <Box className="select-building-button-container">
              <Button
                onMouseEnter={() => setMapImage(building.mapName)}
                onClick={() => navigate(building.path)}
                className="select-building-button"
                variant="contained"
              >
                {building.name}
              </Button>
            </Box>
          </ListItem>
        ))}
      </List>
    ),
  };

  return (
    <Box className="home-page-section">
      <ContentColumn title={upcomingReservationsColumn.title}>
        {upcomingReservationsColumn.content}
      </ContentColumn>
      <Box className="map-container">
        <img className="map-image" src={maps[mapImage]} alt="Map" />
      </Box>
      <ContentColumn title={selectBuildingColumn.title}>
        {selectBuildingColumn.content}
      </ContentColumn>
    </Box>
  );
};

export default HomePage;
