import { Box, Button, List, ListItem } from "@mui/material";
import * as React from "react";
import ContentColumn from "./ContentColumn";

// css
import "./HomePage.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NovaButton from "../Commons/NovaButton";

const HomePage = () => {
  const paths = useSelector((store) => store.paths);
  const user = useSelector((store) => store.user);
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
      name: "Library",
      mapName: "library",
      path: paths.libraryPage,
    },
    {
      name: "Building 2",
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
              <NovaButton
                onMouseEnter={() => setMapImage(building.mapName)}
                onClick={() =>
                  navigate(
                    user.name === undefined ? paths.profilePage : building.path
                  )
                }
              >
                {building.name}
              </NovaButton>
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
