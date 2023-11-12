import { Box, Button, List, ListItem } from "@mui/material";
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

  const buttonListStyle = {
    overflow: "scroll",
  };

  const buildings = [
    {
      name: "Biblioteca",
      mapName: "library",
    },
    {
      name: "Edifício 2",
      mapName: "ed2",
    },
    {
      name: "Biblioteca",
      mapName: "library",
    },
    {
      name: "Edifício 2",
      mapName: "ed2",
    },
    {
      name: "Biblioteca",
      mapName: "library",
    },
    {
      name: "Edifício 2",
      mapName: "ed2",
    },
    {
      name: "Biblioteca",
      mapName: "library",
    },
    {
      name: "Edifício 2",
      mapName: "ed2",
    },
    {
      name: "Biblioteca",
      mapName: "library",
    },
    {
      name: "Edifício 2",
      mapName: "ed2",
    },
    {
      name: "Biblioteca",
      mapName: "library",
    },
    {
      name: "Edifício 2",
      mapName: "ed2",
    },
    {
      name: "Biblioteca",
      mapName: "library",
    },
    {
      name: "Edifício 2",
      mapName: "ed2",
    },
    {
      name: "Biblioteca",
      mapName: "library",
    },
    {
      name: "Edifício 2",
      mapName: "ed2",
    },
    {
      name: "Biblioteca",
      mapName: "library",
    },
    {
      name: "Edifício 2",
      mapName: "ed2",
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
