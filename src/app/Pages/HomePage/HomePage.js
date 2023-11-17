import { Box, Button, List, ListItem, Paper, Typography } from "@mui/material";
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
  const buildings = useSelector((store) => store.buildings);

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

  const buildingsObj = [
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

  const upcomingReservationsContent = () => {
    const retrieveItemImage = (reservation) => {
      let building = { ...buildings[reservation.buildingId] };

      let item = building.items.find((e, idx) => e.id === reservation.itemId);

      return item.image;
    };

    const retrieveBuildingName = (reservation) => {
      return buildingsObj.find(
        (e) => buildings[reservation.buildingId].id === e.mapName
      ).name;
    };

    return user.reservations.map((r, key) => (
      <Box className="reservation-container" key={key}>
        <Paper>
          <Box className="reservation-inner-container">
            <Box className="reservation-image-container">
              <img
                style={{ height: "3rem", width: "3rem" }}
                src={retrieveItemImage(r)}
              />
            </Box>
            <Box className="reservation-metadata">
              <Typography>Deadline:</Typography>
              <Typography sx={{ fontWeight: "bold" }}>
                {r.date.format("DD-MM-YYYY")}
              </Typography>
              <Typography>Building: {retrieveBuildingName(r)}</Typography>
              <Typography>Quantity: {r.quantity}</Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    ));
  };

  let upcomingReservationsColumn = {
    title: "Upcoming Reservations",
    content:
      user.reservations.length === 0 ? undefined : (
        <List sx={buttonListStyle}>{upcomingReservationsContent()}</List>
      ),
  };

  let selectBuildingColumn = {
    title: "Select a Building",
    content: (
      <List sx={buttonListStyle}>
        {buildingsObj.map((building, key) => (
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
